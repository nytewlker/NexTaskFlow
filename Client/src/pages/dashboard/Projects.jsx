import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    project: null,
    mode: "add", // "add", "edit", "view"
  });

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/projects/get");
      setProjects(data);
    } catch (err) {
      console.error("Error fetching projects:", err);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/users");
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleModal = (project = null, mode = "add") => {
    setModalData({ isOpen: true, project, mode });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, project: null, mode: "add" });
  };

  const handleSaveProject = async (project) => {
    try {
      if (modalData.mode === "edit") {
        await axios.put(`http://localhost:5000/api/projects/update/${project._id}`, project);
      } else {
        const { data } = await axios.post("http://localhost:5000/api/projects/add", project);
        setProjects((prev) => [...prev, data]);
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      console.error("Error saving project:", err);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/delete/${id}`);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Project Dashboard</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleModal()}
        >
          Add New Project
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">{project.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{project.description}</p>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => handleModal(project, "view")}
              >
                View
              </button>
              <button
                className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                onClick={() => handleModal(project, "edit")}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteProject(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalData.isOpen && (
        <Modal
          data={modalData}
          users={users}
          onClose={closeModal}
          onSave={handleSaveProject}
        />
      )}
    </div>
  );
};

const Modal = ({ data, users, onClose, onSave }) => {
  const [project, setProject] = useState(
    data.project || { name: "", description: "", status: "Pending", assignee: "" }
  );

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h3 className="text-xl font-bold mb-4">
          {data.mode === "view"
            ? "Project Details"
            : data.mode === "edit"
              ? "Edit Project"
              : "Add Project"}
        </h3>
        {data.mode === "view" ? (
          <div>
            <p><strong>Name:</strong> {project.name}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {users.find((u) => u._id === project.assignee)?.name || "Unassigned"}
            </p>
            <button className="mt-4 bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              className="w-full mb-4 px-3 py-2 border rounded"
              placeholder="Project name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
            />
            <textarea
              className="w-full mb-4 px-3 py-2 border rounded"
              placeholder="Description"
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
            <select
              className="w-full mb-4 px-3 py-2 border rounded"
              value={project.assignee}
              onChange={(e) => setProject({ ...project, assignee: e.target.value })}
            >
              <option value="">Assign To</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end space-x-2">
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => onSave(project)}
              >
                {data.mode === "edit" ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDashboard;
