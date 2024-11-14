import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmail(response.data.email);
      } catch (err) {
        setError('Error fetching profile');
      }
    };
    fetchUserProfile();
  }, []);

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (newEmail === email) {
      setError('New email cannot be the same as the current email');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/users/profile',
        { email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Email updated successfully!');
      setEmail(newEmail);
      setNewEmail('');
    } catch (err) {
      setError('Error updating email');
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Account deleted successfully!');
      localStorage.removeItem('token');
      window.location.href = '/login';
    } catch (err) {
      setError('Error deleting account');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleEmailUpdate}>
        <div>
          <label>Current Email: </label>
          <p>{email}</p>
        </div>
        <div>
          <label>New Email: </label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Email</button>
      </form>
      <button onClick={handleAccountDeletion} style={{ color: 'red', marginTop: '10px' }}>
        Delete Account
      </button>
    </div>
  );
};

export default Profile;