
import { useMemo, useState } from "react";

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
  {
    id: 3,
    title: "Practice Java DSA",
    completed: false,
  },
];

function TaskBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Task actions
  function handleAddTask(event) {
    event.preventDefault();

    const trimmedTitle = taskTitle.trim();

    if (!trimmedTitle) return;

    const newTask = {
      id: crypto.randomUUID(),
      title: trimmedTitle,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskTitle("");
  }

  function handleToggleTask(taskId) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  function handleDeleteTask(taskId) {
    setTasks((prev) =>
      prev.filter((task) => task.id !== taskId)
    );
  }

  // Derived statistics
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingCount = tasks.length - completedCount;

  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case "active":
        return tasks.filter((task) => !task.completed);

      case "completed":
        return tasks.filter((task) => task.completed);

      default:
        return tasks;
    }
  }, [tasks, activeFilter]);

  const filters = [
    { id: "all", label: "All tasks", count: tasks.length },
    { id: "active", label: "Active", count: pendingCount },
    { id: "completed", label: "Completed", count: completedCount },
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F8FAFC] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="flex size-9 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
                T
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">
                TaskForge
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Workspace
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Stay organized. Get things done.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs font-medium text-slate-400">
              TODAY
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              {today}
            </p>
          </div>
        </header>

        {/* Progress section */}
        <section className="mb-6 rounded-2xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-medium text-slate-400">
                Your productivity
              </p>

              <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                {progress === 100 && tasks.length > 0
                  ? "Everything completed!"
                  : "Keep making progress."}
              </h2>

              <p className="mt-2 text-sm text-slate-400">
                You've completed {completedCount} out of {tasks.length} tasks.
              </p>
            </div>

            <div className="flex size-24 shrink-0 flex-col items-center justify-center rounded-full border-4 border-blue-500/30">
              <span className="text-2xl font-bold">
                {progress}%
              </span>
              <span className="text-xs text-slate-400">
                Completed
              </span>
            </div>
          </div>

          <div className="mt-7 h-2 overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full rounded-full bg-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </section>

        {/* Statistics */}
        <section className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Tasks"
            value={tasks.length}
            icon="📋"
            description="All your tasks"
            color="blue"
          />

          <StatCard
            label="Completed"
            value={completedCount}
            icon="✓"
            description="Successfully finished"
            color="green"
          />

          <StatCard
            label="Pending"
            value={pendingCount}
            icon="◷"
            description="Waiting to be done"
            color="amber"
          />
        </section>

        {/* Task management */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">

          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">
              Manage your tasks
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Add tasks and keep track of your progress.
            </p>
          </div>

          {/* Add task */}
          <form
            onSubmit={handleAddTask}
            className="mb-7 flex flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                +
              </span>

              <input
                type="text"
                value={taskTitle}
                onChange={(event) =>
                  setTaskTitle(event.target.value)
                }
                placeholder="What needs to be done?"
                maxLength={120}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <button
              type="submit"
              disabled={!taskTitle.trim()}
              className="rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              + Add Task
            </button>
          </form>

          {/* Filter tabs */}
          <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-70">
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Task list header */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-700">
              {activeFilter === "all"
                ? "All tasks"
                : activeFilter === "active"
                ? "Active tasks"
                : "Completed tasks"}
            </h3>

            <span className="text-xs text-slate-400">
              {filteredTasks.length} items
            </span>
          </div>

          {/* Tasks */}
          <div className="space-y-3">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 px-4 py-12 text-center">
                <div className="mb-3 text-3xl">
                  {tasks.length === 0 ? "📝" : "🎯"}
                </div>

                <h3 className="font-semibold text-slate-800">
                  {tasks.length === 0
                    ? "No tasks yet"
                    : "Nothing to show here"}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {tasks.length === 0
                    ? "Add your first task to get started."
                    : "Try selecting another filter."}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-slate-400">
          TaskForge · Keep focused. Keep building.
        </footer>
      </div>
    </main>
  );
}

// Statistics component
function StatCard({ label, value, icon, description, color }) {
  const colorStyles = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <div className={`flex size-10 items-center justify-center rounded-xl text-lg font-bold ${colorStyles[color]}`}>
          {icon}
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

// Individual task component
function TaskItem({ task, onToggle, onDelete }) {
  return (
    <article
      className={`group flex items-center gap-3 rounded-xl border p-4 transition ${
        task.completed
          ? "border-slate-100 bg-slate-50/70"
          : "border-slate-200 bg-white hover:border-blue-200 hover:shadow-sm"
      }`}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
        className="size-5 shrink-0 cursor-pointer accent-blue-600"
      />

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            task.completed
              ? "text-slate-400 line-through"
              : "text-slate-800"
          }`}
        >
          {task.title}
        </p>

        <p className="mt-1 text-xs text-slate-400">
          {task.completed ? "Task completed" : "In progress"}
        </p>
      </div>

      <span
        className={`hidden rounded-full px-3 py-1 text-xs font-medium sm:inline-block ${
          task.completed
            ? "bg-green-50 text-green-700"
            : "bg-amber-50 text-amber-700"
        }`}
      >
        {task.completed ? "Completed" : "Pending"}
      </span>

      <button
        type="button"
        onClick={() => onDelete(task.id)}
        aria-label={`Delete ${task.title}`}
        className="rounded-lg p-2 text-slate-400 opacity-100 transition hover:bg-red-50 hover:text-red-600 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6"
          />
        </svg>
      </button>
    </article>
  );
}

export default TaskBoard;
