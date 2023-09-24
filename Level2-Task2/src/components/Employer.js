import React, { useEffect, useState } from 'react';
import './Employer.css';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Employer = () => {
  const [jobs, setJobs] = useState([]);
  const [hasPostedJobs, setHasPostedJobs] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = 'http://localhost:5000/api/employer/employerDashboard/jobs';
        const authtoken = localStorage.getItem('token');
        if (!authtoken) {
          console.error('Authentication token is missing.');
          return;
        }
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            'Content-type': 'application/json',
            'auth-token': authtoken
          },
        });
        if (response.ok) {
          const data = await response.json();
          setJobs(data);  // Set the fetched jobs in the state
          console.log(data);
          if (data.length > 0) {
            setHasPostedJobs(true);
          }
        } else {
          console.error('Failed to fetch data:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  // Function to fetch candidates for a job
const fetchCandidatesForJob = async (jobId) => {
  try {
    const authtoken = localStorage.getItem('token');
    if (!authtoken) {
      console.error('Authentication token is missing.');
      return [];
    }

    const apiUrl = `http://localhost:5000/api/application/job/${jobId}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': authtoken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Return the fetched candidates data
    } else {
      console.error('Failed to fetch candidates:', response.status, response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

// Modify the toggleDropdown function to fetch candidates when "View Applications" is clicked
const toggleDropdown = async (jobId) => {
  try {
    console.log('Toggle Dropdown called for jobId:', jobId); // Add this log for debugging

    if (selectedJobId === jobId) {
      setSelectedJobId(null);
      setJobApplications([]); // Clear the applications data
    } else {
      const candidates = await fetchCandidatesForJob(jobId);
      console.log('Fetched candidates:', candidates); // Add this log for debugging

      if (candidates.length > 0) {
        setSelectedJobId(jobId);
        setJobApplications(candidates); // Set the applications data
      } else {
        // No applications received
        setSelectedJobId(jobId);
        setJobApplications([]);
      }
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};


  return (
    <div className='employer-dashboard'>
      <h2 className='heading'>EMPLOYER DASHBOARD</h2>
      <Link to="/postjob">
        <button className="post-job-button">Post a New Job</button>
      </Link>
      {hasPostedJobs ? (
        <ul>
          {jobs.map((job) => (
            <li key={job._id} className='li'>
              <h3>{job.title}</h3>
            <p className='employe'>Description: {job.description}</p>
            <p className='employe'>Company: {job.company}</p>
            <p className='employe'>Location: {job.location}</p>
            <p className='employe'>Job Type: {job.jobType}</p>
            <p className='employe'>Skills Required: {job.skillsRequired.join(', ')}</p>
            <p className='employe'>Category: {job.category}</p>
            <p className='employe'>Salary: {job.salary}</p>
            <div className='button-container'>
                <button onClick={() => toggleDropdown(job._id)} className='view'>
                  {selectedJobId === job._id ? 'Hide Applications' : 'View Applications'}
                </button>
                {selectedJobId === job._id && (
                  <div className='candidates-dropdown'>
                    <h4 className='cand-heading'>Candidates Applied:</h4>
                    {jobApplications.length > 0 ? (
                      jobApplications.map((candidate) => (
                        <li key={candidate._id} className='li'>
                          <p className='candidat'>Name: {candidate.name}</p>
                          <p className='candidat'>Email: {candidate.email}</p>
                          <p className='candidat'>Phone Number: {candidate.phoneNumber}</p>
                          <p className='candidat'>Highest Degree: {candidate.highestDegree}</p>
                          <p className='candidat'>CGPA: {candidate.cgpa}</p>
                          <div>
                            <a href={`http://localhost:5000/api/resumes/${candidate.resume}`} target='_blank' download >Download Resume</a>
                          </div>
                    </li>
                      ))
                    ) : (
                      <p>No applications received.</p>
                    )}
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='noemploye'>No jobs posted</p>
      )}
    </div>
  );
};


export default Employer;
