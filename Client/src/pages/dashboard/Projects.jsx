import React, { useState } from "react";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Project Alpha", description: "Alpha Description", status: "Development", manager: "John Doe", isActive: true },
    { id: 2, name: "Project Beta", description: "Beta Description", status: "Testing", manager: "Jane Smith", isActive: false },
    { id: 3, name: "Project Gamma", description: "Gamma Description", status: "Design", manager: "Jim Beam", isActive: true },
  ]);

  const [currentProject, setCurrentProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  // Open Add/Edit Modal
  const handleOpenModal = (project = null, editMode = false, viewMode = false) => {
    setCurrentProject(project || { name: "", description: "", status: "Development", manager: "", isActive: true });
    setIsEditing(editMode);
    setIsViewing(viewMode);
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setCurrentProject(null);
    setIsModalOpen(false);
    setIsEditing(false);
    setIsViewing(false);
  };

  // Handle Save
  const handleSave = () => {
    if (isEditing) {
      setProjects((prev) =>
        prev.map((proj) =>
          proj.id === currentProject.id ? { ...proj, ...currentProject } : proj
        )
      );
    } else {
      setProjects((prev) => [
        ...prev,
        { id: projects.length + 1, ...currentProject },
      ]);
    }
    handleCloseModal();
  };

  return (
    <div id="#projects" className="flex py-10 min-h-screen">
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">All Projects</h2>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
            onClick={() => handleOpenModal()}
          >
            Add New Project
          </button>
        </header>

        {/* Project Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="p-4 bg-white shadow-sm rounded-lg"
              style={{ borderRadius: "15px" }}
            >
              <h3 className="text-lg font-bold text-gray-700 mb-2">{project.name}</h3>
              <p className="text-sm text-gray-500 mb-1">Status: {project.status}</p>
              <p className="text-sm text-gray-500">Active: {project.isActive ? "Yes" : "No"}</p>
              <div className="flex justify-between mt-4">
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  onClick={() => handleOpenModal(project, false, true)}
                >
                  View
                </button>
                <button
                  className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                  onClick={() => handleOpenModal(project, true)}
                >
                  Edit
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  onClick={() => setProjects((prev) => prev.filter((p) => p.id !== project.id))}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
              {isViewing ? (
                <div>
                  <h3 className="text-xl font-bold mb-4">Project Details</h3>
                  <p className="mb-2"><strong>Name:</strong> {currentProject.name}</p>
                  <p className="mb-2"><strong>Description:</strong> {currentProject.description}</p>
                  <p className="mb-2"><strong>Status:</strong> {currentProject.status}</p>
                  <p className="mb-2"><strong>Manager:</strong> {currentProject.manager}</p>
                  <p className="mb-2"><strong>Active:</strong> {currentProject.isActive ? "Yes" : "No"}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-gray-300 rounded-md"
                    onClick={handleCloseModal}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Project" : "Add Project"}</h3>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={currentProject.name}
                      onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full p-2 border rounded-md"
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Status</label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={currentProject.status}
                      onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                    >
                      <option value="Development">Development</option>
                      <option value="Testing">Testing</option>
                      <option value="Design">Design</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Manager</label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={currentProject.manager}
                      onChange={(e) => setCurrentProject({ ...currentProject, manager: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-300 rounded-md"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDashboard;
