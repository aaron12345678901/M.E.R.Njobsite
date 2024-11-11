// Import necessary modules for React, state management, and making API requests
import React, { useState, useEffect } from 'react'; // React hooks: useState and useEffect
import axios from 'axios'; // Axios for making HTTP requests

const Profile = () => {
  // Define state variables for storing the user's email, new email, error, and success messages
  const [email, setEmail] = useState(''); // State for storing the current email
  const [newEmail, setNewEmail] = useState(''); // State for storing the new email input by the user
  const [error, setError] = useState(''); // State for storing error messages
  const [success, setSuccess] = useState(''); // State for storing success messages

  // useEffect hook to fetch the user's profile when the component mounts
  useEffect(() => {
    // Function to fetch user profile data
    const fetchUserProfile = async () => {
      try {
        // Get the stored authentication token from localStorage
        const token = localStorage.getItem('token');
        // Make a GET request to fetch the user's profile data from the API
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        });

        // Set the email state with the user's email from the response
        setEmail(response.data.email); // Assuming the server returns an email in the response
      } catch (err) {
        // If an error occurs, set the error state with a message
        setError('Error fetching profile');
      }
    };

    // Call the fetchUserProfile function when the component mounts
    fetchUserProfile();
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to handle email update form submission
  const handleEmailUpdate = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if the new email is the same as the current email
    if (newEmail === email) {
      // If the new email is the same, set an error message
      setError('New email cannot be the same as the current email');
      return; // Stop the update if the email hasn't changed
    }

    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');
      // Make a PUT request to update the user's email
      const response = await axios.put(
        'http://localhost:5000/api/users/profile',  // Ensure correct endpoint
        { email: newEmail },  // Send the new email in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
          },
        }
      );

      // If the request is successful, set the success message
      setSuccess('Email updated successfully!');
      // Update the displayed email with the new email
      setEmail(newEmail);
      // Clear the new email input field
      setNewEmail('');
    } catch (err) {
      // If an error occurs, set the error message
      setError('Error updating email');
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      {/* Display error message if there is an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display success message if the email is updated successfully */}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {/* Form to update the user's email */}
      <form onSubmit={handleEmailUpdate}>
        <div>
          <label>Current Email: </label>
          {/* Display the current email */}
          <p>{email}</p>
        </div>

        <div>
          <label>New Email: </label>
          {/* Input field for the user to type the new email */}
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)} // Update the new email state as the user types
            required
          />
        </div>

        {/* Submit button for updating the email */}
        <button type="submit">Update Email</button>
      </form>
    </div>
  );
};

export default Profile; // Export the Profile component for use in other parts of the app