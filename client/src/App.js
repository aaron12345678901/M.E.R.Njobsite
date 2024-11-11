// Import necessary modules and components for routing and functionality
import React from "react"; // Import React library
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Router, Route, and Routes for client-side routing
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode JWT (though it's not used in this file)
import Home from "./components/Home"; // Import Home component
import Welcome from "./components/Welcome"; // Import Welcome component
import AddJob from "./components/AddJob"; // Import AddJob component
import Profile from "./components/Profile"; // Import Profile component
import './App.css'; // Import the CSS file for styling

// Define the main App component
function App() {
    const userId = "user_id_here"; // Set a placeholder for user ID (this should be dynamically set based on the logged-in user)

    return (
        // Set up Router to enable routing between different components/pages
        <Router>
            {/* Define Routes to render components based on URL path */}
            <Routes>
                {/* Home route - renders the Home component at the root path */}
                <Route path="/" element={<Home />} />

                {/* Welcome route - renders the Welcome component */}
                <Route path="/welcome" element={<Welcome />} />

                {/* AddJob route - renders the AddJob component to allow job creation */}
                <Route path="/add-job" element={<AddJob />} />

                {/* Profile route - renders the Profile component, passing the userId as a prop */}
                <Route path="/profile" element={<Profile userId={userId} />} />
            </Routes>
        </Router>
    );
}

// Export the App component so it can be used in other parts of the application
export default App;