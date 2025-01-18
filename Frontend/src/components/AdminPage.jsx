/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './AdminPage.css'; // Optional: Add CSS for styling

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [deletionRequests, setDeletionRequests] = useState([]);
  const [error, setError] = useState('');

  // Fetch users and deletion requests on component mount
  useEffect(() => {
    fetchUsers();
    fetchDeletionRequests();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/admin/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(response.data);
    } catch (error) {
      setError('Failed to fetch users');
    }
  };

  const fetchDeletionRequests = async () => {
    try {
      const response = await axios.get('/api/admin/deletion-requests', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDeletionRequests(response.data);
    } catch (error) {
      setError('Failed to fetch deletion requests');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;

    try {
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setUsers(users.filter((user) => user._id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  const approveDeletion = async (userId) => {
    try {
      await axios.post(`/api/admin/deletion-requests/${userId}/approve`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setDeletionRequests(deletionRequests.filter((user) => user._id !== userId));
      alert('Account deletion approved');
    } catch (error) {
      setError('Failed to approve deletion request');
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>

      {error && <p className="error-message">{error}</p>}

      <section>
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => deleteUser(user._id)} className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2>Account Deletion Requests</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Request Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deletionRequests.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.requestedAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => approveDeletion(user._id)} className="approve-btn">
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
