import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [isModalOpen, setModalOpen] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const { data } = await axios.get("https://nextaskflow.onrender.com/api/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    }
  };

  // Fetch users from the backend
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("https://nextaskflow.onrender.com/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchUsers();
  }, []);

  const handleModalOpen = (project = null, mode = "add") => {
    setSelectedProject(project);
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedProject(null);
    setModalMode("add");
    setModalOpen(false);
  };

  const handleSaveProject = async (project) => {
    const endpoint =
      modalMode === "edit"
        ? `https://nextaskflow.onrender.com/api/projects/${project._id}`
        : "https://nextaskflow.onrender.com/api/projects";

    const method = modalMode === "edit" ? "put" : "post";

    try {
      const { data } = await axios[method](endpoint, project, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProjects((prevProjects) =>
        modalMode === "edit"
          ? prevProjects.map((p) => (p._id === data.project._id ? data.project : p))
          : [...prevProjects, data.project]
      );
      handleModalClose();
    } catch (err) {
      console.error("Failed to save project:", err);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      await axios.delete(`https://nextaskflow.onrender.com/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects((prevProjects) => prevProjects.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Failed to delete project:", err);
    }
  };

  const handleRemoveTeamMember = async (projectId, userId) => {
    try {
      await axios.delete(`https://nextaskflow.onrender.com/api/projects/${projectId}/team`, {
        data: { userId },
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh projects after removal
      fetchProjects();
    } catch (err) {
      console.error("Failed to remove team member:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Project Dashboard</h1>
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => handleModalOpen()}
        >
          <FaPlus className="mr-2" />
          Add New Project
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onView={() => handleModalOpen(project, "view")}
            onEdit={() => handleModalOpen(project, "edit")}
            onDelete={() => handleDeleteProject(project._id)}
          />
        ))}
      </div>

      {isModalOpen && (
        <ProjectModal
          mode={modalMode}
          project={selectedProject}
          users={users}
          onClose={handleModalClose}
          onSave={handleSaveProject}
          token={token} // Pass the token as a prop

        />
      )}
    </div>
  );
};
  const ProjectCard = ({ project, onView, onEdit, onDelete }) => (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg">
      <h3 className="font-bold text-lg">{project.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{project.description}</p>
    
      {/* Add manager info */}
      <p className="text-sm text-gray-600">
        Manager: {project.manager?.name || 'Not Assigned'}
      </p>
    
      {/* Add team members count */}
      <p className="text-sm text-gray-600">
        Team Size: {project.team?.length || 0} members
      </p>
    
      {/* Add tasks count */}
      <p className="text-sm text-gray-600 mb-4">
        Tasks: {project.tasks?.length || 0}
      </p>
    
      <div className="flex justify-between space-x-2">
        <button
          className="flex items-center bg-green-500 text-white px-3 py-1 rounded"
          onClick={onView}
        >
          <FaEye className="mr-2" /> View
        </button>
        <button
          className="flex items-center bg-yellow-400 text-white px-3 py-1 rounded"
          onClick={onEdit}
        >
          <FaEdit className="mr-2" /> Edit
        </button>
        <button
          className="flex items-center bg-red-500 text-white px-3 py-1 rounded"
          onClick={onDelete}
        >
          <FaTrash className="mr-2" /> Delete
        </button>
      </div>
    </div>
  );
const ProjectModal = ({ mode, project, users, onClose, onSave }) => {
  const [formState, setFormState] = useState(
    project || {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      managerId: "",
      team: []
    }
  );

  const [selectedTeamMember, setSelectedTeamMember] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  const handleAddTeamMember = async () => {
    try {
      await axios.post(`https://nextaskflow.onrender.com/api/projects/${project._id}/team`, {
        userId: selectedTeamMember,
        role: selectedRole
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh project data
      fetchProjects();
    } catch (err) {
      console.error("Failed to add team member:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-11/12 max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {mode === "view"
            ? "View Project"
            : mode === "edit"
            ? "Edit Project"
            : "Add Project"}
        </h2>
        {mode !== "view" ? (
          <form onSubmit={handleSubmit}>
            <input
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Project Title"
              className="w-full mb-4 p-2 border rounded"
              required
            />
            <textarea
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Project Description"
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={formState.startDate}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="date"
                name="endDate"
                value={formState.endDate}
                onChange={handleChange}
                className="w-1/2 p-2 border rounded"
              />
            </div>
            <select
              name="managerId"
              value={formState.managerId}
              onChange={handleChange}
              className="w-full mt-4 p-2 border rounded"
            >
              <option value="">Select Manager</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-blue-500 text-white w-full py-2 mt-4 rounded"
            >
              Save
            </button>
          </form>
        ) : (
          <div>
            <p>
              <strong>Title:</strong> {project.title}
            </p>
            <p>
              <strong>Description:</strong> {project.description}
            </p>
            <div className="mt-4">
              <h3 className="font-bold">Team Members</h3>
              <ul>
                {project.team?.map(member => (
                  <li key={member.user._id} className="flex justify-between items-center">
                    <span>{member.user.name} - {member.role}</span>
                    <button 
                      onClick={() => handleRemoveTeamMember(member.user._id)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              
              <div className="mt-4">
                <select 
                  value={selectedTeamMember}
                  onChange={(e) => setSelectedTeamMember(e.target.value)}
                  className="w-full p-2 border rounded mb-2"
                >
                  <option value="">Select Team Member</option>
                  {users.map(user => (
                    <option key={user._id} value={user._id}>{user.name}</option>
                  ))}
                </select>
                
                <input
                  type="text"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  placeholder="Role"
                  className="w-full p-2 border rounded mb-2"
                />
                
                <button
                  onClick={handleAddTeamMember}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Team Member
                </button>
              </div>
            </div>
            <button
              className="bg-gray-400 text-white w-full py-2 mt-4 rounded"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default ProjectDashboard;
