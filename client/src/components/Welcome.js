import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const Welcome = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch jobs when the component mounts
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs");
        setJobs(response.data); // Set the fetched jobs to state
      } catch (error) {
        console.error("There was an error fetching the jobs:", error);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h1>Welcome!</h1>
      {/* Navigation links */}
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-job">Add Job</Link>
          </li>
          <li>
          <Link to="/profile">Edit Profile</Link>
          </li>
        </ul>
      </nav>

      {/* Display the list of jobs */}
      <h2>Available Jobs</h2>
      <ul>
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <li key={job._id}>
              <h3>{job.title}</h3>
              <p>{job.excerpt}</p>
              <p><strong>Skills Required:</strong> {job.skillsRequired}</p>
            </li>
          ))
        ) : (
          <p>No jobs available</p>
        )}
      </ul>
    </div>
  );
};

export default Welcome;