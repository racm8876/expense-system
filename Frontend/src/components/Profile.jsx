/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/profile');
      setUser(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Profile</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button onClick={() => requestAccountDeletion()}>Request Account Deletion</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const requestAccountDeletion = async () => {
  try {
    await axios.post('/api/auth/request-deletion');
    alert('Account deletion request sent. Your account will be deleted in 15 days.');
  } catch (error) {
    alert(error.response.data.error);
  }
};

export default Profile;
