import React from 'react';
import './JobApply.css';
import { useState } from 'react';

const JobApply = ({jobId, candidateEmail}) => {
   
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        highestDegree: '',
        cgpa: '',
        resume: null, // This stores the uploaded resume file
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleResumeUpload = (e) => {
        const resumeFile = e.target.files[0];
        setFormData({
          ...formData,
          resume: resumeFile,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('phoneNumber', formData.phoneNumber);
        formDataToSend.append('highestDegree', formData.highestDegree);
        formDataToSend.append('cgpa', formData.cgpa);
        formDataToSend.append('resume', formData.resume);
        // Add jobId to the form data
        formDataToSend.append('job', jobId);
        formDataToSend.append('candidateEmail', candidateEmail);

        // Send a POST request to your backend API with jobDetails
        try {
          const response = await fetch('http://localhost:5000/api/application/apply', {
            method: 'POST',
            headers: {
              'auth-token': localStorage.getItem('token'),
            },
            body: formDataToSend, // Send the FormData object
          });
          console.log('Response Status:', response.status);
console.log('Response Text:', await response.text());

    

          if (response.ok) {
            // Job application stored successfully, show a success message
            alert('Applied for the job successfully!'); // Display a pop-up message
            // You can also redirect to a different page if needed
            // Clear the form fields after successful submission
            setFormData({
                name: '',
                email: '',
                phoneNumber: '',
                highestDegree: '',
                cgpa: '',
                resume: null,
              });
          } else {
            // Handle errors if the job posting fails
            alert('Failed to apply for the job. Please try again.'); // Display an error message
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      return (
        <div className="apply-form-container">
          <h2 className='apply-heading'>Apply for the Job</h2>
          <form onSubmit={handleSubmit} className='apply-form' encType='multipart/form-data'>
            <label>
              Full Name:
              <input type="text" name="name"  onChange={handleInputChange} required />
            </label>
            <label>
              Email:
              <input type="email" name="email" onChange={handleInputChange} required />
            </label>
            <label>
              Phone Number:
              <input type="tel" name="phoneNumber"  onChange={handleInputChange} required />
            </label>
            <label>
              Highest Degree:
              <input type="text" name="highestDegree"  onChange={handleInputChange} required />
            </label>
            <label>
              CGPA:
              <input type="text" name="cgpa"  onChange={handleInputChange} required />
            </label>
            <label>
              Resume (PDF):
              <input type="file" name="resume" accept=".pdf" onChange={handleResumeUpload} required />
            </label>
            <button type="submit" className='applied'>Submit Application</button>
          </form>
        </div>
      );
    };

export default JobApply;
