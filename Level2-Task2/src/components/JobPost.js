import React, { useState } from 'react';
import './JobPost.css';

const JobPost = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    jobType: '',
    skillsRequired: [],
    category: '',
    salary: '',
    applicationDeadline: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // If the input field is for skillsRequired, split the comma-separated string into an array
  if (name === 'skillsRequired') {
    setJobDetails({
      ...jobDetails,
      [name]: value.split(',').map(skill => skill.trim()), // Split by comma and trim spaces
    });
  } else {
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
   }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send a POST request to your backend API with jobDetails
    try {
      const response = await fetch('http://localhost:5000/api/jobs/newjob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        // Job posted successfully, show a success message
        alert('Job posted successfully!'); // Display a pop-up message
        // You can also redirect to a different page if needed
        // Clear the form fields after successful submission
      setJobDetails({
        title: '',
        description: '',
        company: '',
        location: '',
        jobType: '',
        skillsRequired: [],
        category: '',
        salary: '',
        applicationDeadline: '',
      });
      } else {
        // Handle errors if the job posting fails
        alert('Failed to post the job. Please try again.'); // Display an error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="job-post-container">
      <h2 className='job-heading'>Post a New Job</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Job Title:
          <input type="text" name="title" value={jobDetails.title} onChange={handleInputChange} required />
        </label>
        <label>
          Description:
          <textarea name="description" value={jobDetails.description} onChange={handleInputChange} required />
        </label>
        <label>
          Company:
          <input type="text" name="company" value={jobDetails.company} onChange={handleInputChange} required />
        </label>
        <label>
          Location:
          <input type="text" name="location" value={jobDetails.location} onChange={handleInputChange} required />
        </label>
        <label>
          Job Type:
          <input type="text" name="jobType" value={jobDetails.jobType} onChange={handleInputChange} required />
        </label>
        <label>
          Skills Required (Comma-separated):
          <input type="text" name="skillsRequired" value={jobDetails.skillsRequired.join(', ')} onChange={handleInputChange} required />
        </label>
        <label>
          Category:
          <input type="text" name="category" value={jobDetails.category} onChange={handleInputChange} required />
        </label>
        <label>
          Salary:
          <input type="text" name="salary" value={jobDetails.salary} onChange={handleInputChange} required />
        </label>
        <label>
          Application Deadline:
          <input type="date" name="applicationDeadline" value={jobDetails.applicationDeadline} onChange={handleInputChange} required />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default JobPost;
