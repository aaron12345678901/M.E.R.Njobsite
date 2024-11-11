// Import necessary modules for React, state management, and making HTTP requests
import React, { useState } from "react"; // useState for managing local state in the component
import axios from "axios"; // Axios for making HTTP requests

const AddJob = () => {
  // State to manage the form fields (title, excerpt, skillsRequired) for a new job
  const [job, setJob] = useState({
    title: "", // Job title
    excerpt: "", // Job excerpt or description
    skillsRequired: "" // Skills required for the job
  });

  // State to manage the success/error message after form submission
  const [message, setMessage] = useState(""); 

  // Handle form input changes and update the job state
  const handleChange = (e) => {
    const { name, value } = e.target; // Get the name and value of the input field
    setJob({
      ...job, // Spread the previous job object to retain unchanged fields
      [name]: value // Update the specific field based on input name (title, excerpt, or skillsRequired)
    });
  };

  // Handle form submission (adding a new job)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    console.log(job);  // Log the job data to the console for debugging

    try {
      // Make a POST request to the API with the job data (sending it to the server to be added)
      const response = await axios.post("http://localhost:5000/api/jobs", job);
      // Show success message after successfully adding the job
      setMessage("Job successfully added!");
      
      // Clear the form inputs after submission
      setJob({
        title: "",
        excerpt: "",
        skillsRequired: ""
      });
      console.log("Job added:", response.data); // Log the response from the server
    } catch (error) {
      // If there is an error, log the error to the console
      console.error("There was an error adding the job:", error);
      // Set the error message to be displayed to the user
      setMessage("There was an error submitting the job.");
    }
  };

  return (
    <div>
      <h1>Add a New Job</h1>  {/* Heading for the job submission form */}

      <form onSubmit={handleSubmit}>  {/* Form element to submit job data */}
        {/* Input field for job title */}
        <input
          type="text"
          name="title"
          value={job.title} // Bind the input field to the title state
          onChange={handleChange} // Call handleChange when the input changes
          placeholder="Job Title" // Placeholder text for the input field
        />

        {/* Textarea for job description or excerpt */}
        <textarea
          name="excerpt"
          value={job.excerpt} // Bind the textarea field to the excerpt state
          onChange={handleChange} // Call handleChange when the textarea content changes
          placeholder="Job Excerpt" // Placeholder text for the textarea
        />

        {/* Input field for skills required */}
        <input
          type="text"
          name="skillsRequired"
          value={job.skillsRequired} // Bind the input field to the skillsRequired state
          onChange={handleChange} // Call handleChange when the input changes
          placeholder="Skills Required" // Placeholder text for the input field
        />

        {/* Submit button to trigger the form submission */}
        <button type="submit">Add Job</button>
      </form>
      
      {/* Conditionally render the success or error message */}
      {message && <p>{message}</p>} {/* If there's a message, display it */}
    </div>
  );
};

export default AddJob; // Export the AddJob component for use in other parts of the app