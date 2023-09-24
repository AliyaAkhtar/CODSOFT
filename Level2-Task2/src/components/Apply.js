import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import JobApply from './JobApply';

const Apply = () => {
     // Add this to get the job ID from the route parameters
    const { jobId } = useParams();
    console.log('hello');
    console.log('jobId:', jobId); // Add this line
    const [candidateEmail, setCandidateEmail] = useState('');

    const fetchCandidateEmail = async ()=> {
        try{
                const response = await fetch('http://localhost:5000/api/candidate/getEmail', {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'auth-token': localStorage.getItem('token'),
                    },
                });
                if (!response.ok) {
                   throw new Error('Failed to fetch candidate email');
                }
                const data = await response.json();
                console.log(data);
                return data.email;
            } catch (error) {
                console.error('Error:', error);
            }
        };
        useEffect(()=>{
            const authToken = localStorage.getItem('token');
            fetchCandidateEmail(authToken)
            .then((email) => setCandidateEmail(email))
            .catch((error) => console.log(error));
        },[]);
        let navigate = useNavigate()
        if(localStorage.getItem('token')){
            return <JobApply jobId={jobId} candidateEmail={candidateEmail}/>; 
        }
        else{
            navigate('/login');
        }
};

export default Apply;
