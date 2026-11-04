
import { useState } from "react";

const initialTasks = [
  {
    id: 1,
    title: "Learn React Hooks",
    completed: false,
  },
  {
    id: 2,
    title: "Build TaskForge Dashboard",
    completed: true,
  },
];

function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState("");

  // Add a new task
  function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
    };

    setTasks((prevTasks) => [
      ...prevTasks,
      newTask,
    ]);

    setTaskTitle("");
  }

  // Toggle task completion
  function handleToggleTask(taskId) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  // Derived values: no separate state needed
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-12">
      <section className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            TaskForge
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your daily tasks
          </p>
        </div>

        {/* Task statistics */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Total" value={tasks.length} />
          <StatCard label="Completed" value={completedCount} />
          <StatCard label="Pending" value={pendingCount} />
        </div>

        {/* Add task form */}
        <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
          <input
            type="text"
            value={taskTitle}
            onChange={(event) =>
              setTaskTitle(event.target.value)
            }
            placeholder="Enter a new task..."
            className="min-w-0 flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {/* Task list */}
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                aria-label={`Mark ${task.title} as completed`}
                className="size-4 accent-blue-600"
              />

              <span
                className={`flex-1 text-sm ${
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }`}
              >
                {task.title}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  task.completed
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {task.completed ? "Done" : "Pending"}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-3">
      <p className="text-2xl font-bold text-slate-900">
        {value}
      </p>

      <p className="text-xs text-slate-500">
        {label}
      </p>
    </div>
  );
}

export default TaskBoard;
