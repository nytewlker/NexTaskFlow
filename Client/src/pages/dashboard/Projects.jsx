import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch projects from placeholder API
    axios
      .get("http://localhost:5000/api/projects/get")
      .then((response) => setProjects(response.data.slice(0, 6)));

    // Fetch users for assignments
    axios
      .get("http://localhost:5000/api/users")
      .then((response) => setUsers(response.data))
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  const handleOpenModal = (project = null, editMode = false, viewMode = false) => {
    // Ensure the project.id is set correctly in the state
    setCurrentProject(
      project || { name: "", body: "", status: "Development", assignee: "", isActive: true, id: "" }
    );
    setIsEditing(editMode);
    setIsViewing(viewMode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentProject(null);
    setIsModalOpen(false);
    setIsEditing(false);
    setIsViewing(false);
  };

  const handleSave = () => {
    if (!currentProject.name || !currentProject.body || !currentProject.assignee) {
      alert("All fields are required!");
      return;
    }
  
    const projectData = {
      name: currentProject.name,
      body: currentProject.body,
      status: currentProject.status,
      assignee: currentProject.assignee,
      isActive: currentProject.isActive,
    };
  
    if (isEditing && currentProject.id) {
      // Ensure currentProject.id exists before sending the PUT request
      axios
        .put(`http://localhost:5000/api/projects/update/${currentProject.id}`, projectData)
        .then(() => {
          setProjects((prev) =>
            prev.map((proj) => (proj.id === currentProject.id ? currentProject : proj))
          );
          handleCloseModal();
        })
        .catch((err) => console.error("Error updating project:", err));
    } else {
      // If the id is undefined or empty, it will create a new project
      axios
        .post("http://localhost:5000/api/projects/add", projectData)
        .then((response) => {
          setProjects((prev) => [...prev, { ...response.data }]);
          handleCloseModal();
        })
        .catch((err) => console.error("Error adding project:", err));
    }
  };

  const handleDelete = (id) => {
    if (id) {
      axios.delete(`http://localhost:5000/api/projects/delete/${id}`).then(() => {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }).catch((err) => {
        console.error("Error deleting project:", err);
      });
    } else {
      console.error("Project ID is undefined");
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Dashboard</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleOpenModal()}
        >
          Add New Project
        </button>
      </header>

      {/* Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{project.body}</p>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => handleOpenModal(project, false, true)}
              >
                View
              </button>
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => handleOpenModal(project, true)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(project.id)}
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
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            {isViewing ? (
              <div>
                <h3 className="text-xl font-bold mb-4">Project Details</h3>
                <p><strong>name:</strong> {currentProject.name}</p>
                <p><strong>Description:</strong> {currentProject.body}</p>
                <p><strong>Status:</strong> {currentProject.status}</p>
                <p>
                  <strong>Assigned To:</strong> {users.find((u) => currentProject.assignee)?.name || "Unassigned"}
                </p>
                <button
                  className="mt-4 bg-gray-300 px-4 py-2 rounded"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-4">{isEditing ? "Edit Project" : "Add Project"}</h3>
                <input
                  type="text"
                  className="w-full mb-4 px-3 py-2 border rounded"
                  placeholder="Project name"
                  value={currentProject.name}
                  onChange={(e) => setCurrentProject({ ...currentProject, name: e.target.value })}
                />
                <textarea
                  className="w-full mb-4 px-3 py-2 border rounded"
                  placeholder="Description"
                  value={currentProject.body}
                  onChange={(e) => setCurrentProject({ ...currentProject, body: e.target.value })}
                />
                <select
                  className="w-full mb-4 px-3 py-2 border rounded"
                  value={currentProject.assignee || ""}
                  onChange={(e) => setCurrentProject({ ...currentProject, assignee: e.target.value || "" })}
                >
                  <option value="">Assign To</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <button
                    className="bg-gray-300 px-4 py-2 rounded"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={handleSave}
                  >
                    {isEditing ? "Save Changes" : "Add Project"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
