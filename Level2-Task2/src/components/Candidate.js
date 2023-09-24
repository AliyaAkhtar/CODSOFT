import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Candidate.css'; // Import your CSS file

const Candidate = () => {
    // const { candidateEmail } = useParams();
    const [applications, setApplications] = useState([]);
    const [candidateEmail, setCandidateEmail] = useState('');
  
    useEffect(() => {
            const fetchData = async () => {
              try {
                // Fetch the candidate's email
                const emailResponse = await fetch('http://localhost:5000/api/candidate/getEmail', {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token'),
                  },
                });
          
                if (!emailResponse.ok) {
                  throw new Error('Failed to fetch candidate email');
                }
          
                const emailData = await emailResponse.json();
                setCandidateEmail(emailData.email);
          
                // Fetch the candidate's applied jobs based on their email
                const applicationsResponse = await fetch(`http://localhost:5000/api/application/candidate/${emailData.email}`, {
                    method: 'GET',
                    headers: {
                      'Content-Type': 'application/json',
                      'auth-token': localStorage.getItem('token'),
                    },
                });
                
                if (!applicationsResponse.ok) {
                  throw new Error('Failed to fetch applications');
                }
          
                const applicationsData = await applicationsResponse.json();
                setApplications(applicationsData);
              } catch (error) {
                console.error('Error:', error);
              }
            };
          
            fetchData();
          }, []);
       

  return (
    <div className="candidate-container">
      <h2 className="cand-dashboard">Your Applied Jobs</h2>
      <ul className="applied-jobs-list" >
        {applications.map((application) => (
          <li key={application._id} className='di'>
            <h3 className="job-details">{application.job.title}</h3>
            <p className="job-details">Company: {application.job.company}</p>
            <p className="job-details">Location: {application.job.location}</p>
            <p className="job-details">Category: {application.job.category}</p>
            <p className="job-details">Salary: {application.job.salary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Candidate;
