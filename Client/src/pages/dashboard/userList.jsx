import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    mode: null, // 'create', 'edit', or 'view'
    user: null,
  });

  // Fetch users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/users');
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Open Modal
  const openModal = (mode, user = null) => {
    setModalData({ isOpen: true, mode, user });
  };

  // Close Modal
  const closeModal = () => {
    setModalData({ isOpen: false, mode: null, user: null });
  };

  // Save User (Create or Edit)
  const handleSaveUser = async (formData) => {
    try {
      if (modalData.mode === 'create') {
        const { data } = await axios.post('http://localhost:5000/api/users', formData);
        setUsers((prev) => [...prev, data.user]);
      } else if (modalData.mode === 'edit') {
        const { data } = await axios.put(
          `http://localhost:5000/api/users/edit/${modalData.user._id}`,
          formData
        );
        setUsers((prev) =>
          prev.map((user) => (user._id === modalData.user._id ? data.user : user))
        );
      }
      closeModal();
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/delete/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => openModal('create')}
        >
          Add User
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">{user.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{user.email}</p>
            <div className="flex justify-between">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={() => openModal('edit', user)}
              >
                Edit
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                onClick={() => openModal('view', user)}
              >
                View
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalData.isOpen && (
        modalData.mode === 'view' ? (
          <UserViewModal user={modalData.user} onClose={closeModal} />
        ) : (
          <UserModal
            mode={modalData.mode}
            user={modalData.user}
            onSave={handleSaveUser}
            onClose={closeModal}
          />
        )
      )}
    </div>
  );
};

// Modal Component for Viewing User
const UserViewModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h3 className="text-xl font-bold mb-4">View User</h3>
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          {/* Add any other details you want to show */}
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal Component for Creating or Editing User
const UserModal = ({ mode, user, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'user',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
        <h3 className="text-xl font-bold mb-4">{mode === 'create' ? 'Add User' : 'Edit User'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {mode === 'create' && (
            <div className="mb-4">
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserManagement;
