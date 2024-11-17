import React, { useState } from "react";

// Initial sample tasks data
const initialTasks = [
  { id: 1, title: "Task 1", description: "Complete the project proposal", status: "todo" },
  { id: 2, title: "Task 2", description: "Review design documents", status: "in-progress" },
  { id: 3, title: "Task 3", description: "Fix bugs in the application", status: "done" },
];

const TaskManager = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState({ title: "", description: "", status: "todo" });
  const [showModal, setShowModal] = useState(false);

  // Task creation handler
  const handleCreateTask = () => {
    setTasks([
      ...tasks,
      { id: tasks.length + 1, ...newTask },
    ]);
    setNewTask({ title: "", description: "", status: "todo" });
    setShowModal(false);
  };

  // Task status update handler
  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  // Modal toggle handler
  const toggleModal = () => setShowModal(!showModal);

  // Task Columns
  const columns = {
    todo: "To Do",
    "in-progress": "In Progress",
    done: "Done"
  };

  return (
    <div id="tasks"className=" py-10">
      {/* Header */}
      <header className="py-10 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-semibold">
            Task Manager
          </h1>
          <button
            onClick={toggleModal}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Create New Task
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Kanban Board */}
        <div className="flex gap-4 w-full">
          {Object.keys(columns).map((column) => (
            <div key={column} className="flex-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold mb-4">{columns[column]}</h2>
              <div className="space-y-4">
                {tasks
                  .filter(task => task.status === column)
                  .map(task => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-700 p-4 rounded-md shadow cursor-pointer"
                    >
                      <h3 className="text-md font-semibold">{task.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{task.description}</p>
                      <div className="mt-4 space-x-2">
                        {Object.keys(columns).map(status => (
                          status !== task.status && (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(task.id, status)}
                              className={`px-2 py-1 rounded ${
                                status === "done"
                                  ? "bg-green-500"
                                  : status === "in-progress"
                                  ? "bg-yellow-500"
                                  : "bg-blue-500"
                              } text-white text-sm`}
                            >
                              Move to {columns[status]}
                            </button>
                          )
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-md w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create a New Task</h3>
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full mb-4 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
            ></textarea>
            <button
              onClick={handleCreateTask}
              className="px-4 py-2 rounded bg-green-500 text-white mr-2"
            >
              Create Task
            </button>
            <button
              onClick={toggleModal}
              className="px-4 py-2 rounded bg-red-500 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManager;
