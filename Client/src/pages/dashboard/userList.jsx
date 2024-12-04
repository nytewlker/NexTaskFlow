import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState({
    isOpen: false,
    mode: null, // 'create', 'edit', or 'view'
    user: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch users
  const fetchUsers = async () => {
    setIsLoading(true);
    setError('');
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openModal = (mode, user = null) => {
    setModalData({ isOpen: true, mode, user });
  };

  const closeModal = () => {
    setModalData({ isOpen: false, mode: null, user: null });
  };

  const handleSaveUser = async (formData) => {
    try {
      setIsLoading(true);
      if (modalData.mode === 'create') {
        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/users`, formData);
        setUsers((prev) => [...prev, data.user]);
      } else if (modalData.mode === 'edit') {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API_URL}/users/${modalData.user._id}`,
          formData
        );
        setUsers((prev) =>
          prev.map((user) => (user._id === modalData.user._id ? data.user : user))
        );
      }
      closeModal();
    } catch (err) {
      setError('Failed to save user. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => openModal('create')}
        >
          Add User
        </button>
      </header>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
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
      )}

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

// Modal components remain the same.

export default UserManagement;
