// Import necessary modules for React, state management, and making HTTP requests
import React, { useState } from "react"; // useState for managing local state in the component
import axios from "axios"; // Axios for making HTTP requests

const Home = () => {
  // Define state variables for email, password, and login/register toggle
  const [email, setEmail] = useState(""); // State for storing the user's email
  const [password, setPassword] = useState(""); // State for storing the user's password
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register forms (default is login)

  // Function to handle form submission (for both login and registration)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)

    try {
      // Set the API endpoint based on whether the user is logging in or registering
      const url = `http://localhost:5000/api/auth/${
        isLogin ? "login" : "register" // Choose 'login' or 'register' endpoint based on isLogin state
      }`;
      // Send a POST request with the email and password to the appropriate API endpoint
      const { data } = await axios.post(url, { email, password });
      // Store the received token in localStorage for later use
      localStorage.setItem("token", data.token);
      // Redirect the user to the "welcome" page after successful login/registration
      window.location = "/welcome";
    } catch (error) {
      // If an error occurs during the request, log the error message to the console
      console.error(
        "Error:",
        error.response?.data.message || "Something went wrong" // Use error message from response if available
      );
    }
  };

  return (
    <div>
      <div className="home-body">
        {/* Main heading displaying the welcome message */}
        <div className="main-heading">
          <h1>Welcome</h1>
          <h2>to</h2>
          <h2>the</h2>
          <h1>job site</h1>
        </div>

        {/* Form section for login or registration */}
        <div className="log-form">
          {/* Display 'Login' or 'Register' depending on the isLogin state */}
          <h1>{isLogin ? "Login" : "Register"}</h1>
          <form onSubmit={handleSubmit}>
            {/* Input field for the user's email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state as the user types
              required // Make this field required
            />
            {/* Input field for the user's password */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state as the user types
              required // Make this field required
            />
            {/* Submit button that changes text based on login/register state */}
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>
          {/* Button to toggle between login and registration forms */}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Switch to Register" : "Switch to Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home; // Export the Home component for use in other parts of the app