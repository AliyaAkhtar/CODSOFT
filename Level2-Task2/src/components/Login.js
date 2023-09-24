import React from 'react'
import './SignUp.css'
import { AiOutlineMail } from 'react-icons/ai'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'; // Import useHistory

const Login = () => {
  const [action, setAction] = useState("Candidate");
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate(); // Initialize useHistory


  const handleSubmit = async (e) => {
    e.preventDefault();

    let apiUrl = '';

    if (action === 'Candidate') {
      apiUrl = 'http://localhost:5000/api/candidate/login';
    } else if (action === 'Employer') {
      apiUrl = 'http://localhost:5000/api/employer/login';
    }
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json()
    console.log(json);
    if(json.success){
      localStorage.setItem('token', json.authtoken);
      toast.success("Successfully Logged In!");
      // Redirect to the appropriate page based on user type
      if (action === 'Candidate') {
        localStorage.setItem('user-type','candidate');
        navigate('/jobs'); // Redirect candidates to the "Jobs" page
      } else if (action === 'Employer') {
        localStorage.setItem('user-type','employer');
        navigate('/employer'); // Redirect employers to the "Employer" page
      }
    }
    }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <div className='head'>
        {/* <div className='text'>{action}</div> */}
        <div className='text'>LOGIN</div>
        <div className='underline'></div>
        <div className='content'>{action}</div>
        <form onSubmit={handleSubmit}>
        <div className='submit-container'>
          <div className={action === "Candidate" ? "submit gray" : "submit"} onClick={() => { setAction("Employer") }}>Employer</div>
          <div className={action === "Employer" ? "submit gray" : "submit"} onClick={() => { setAction("Candidate") }}>Candidate</div>
        </div>
        <div className='inputs'>
          {/* <div className='input'>
                <AiOutlineUser className='user'/>
                <input type='text' placeholder='Name'/>
              </div> */}
            <div className='input'>
              <AiOutlineMail className='user' />
              <input type='email' value={credentials.email} name='email'  onChange={onChange} placeholder='Email Id' />
            </div>
            <div className='input'>
              <RiLockPasswordLine className='user' />
              <input type='password' value={credentials.password} name='password' onChange={onChange} placeholder='Password' />
            </div>
        </div>
        <div className='forgot-password'>Forgot Password? <span>Click Here!</span></div>
        <button className='button'>LOGIN</button>
      </form>
    </div>  
    </div >
  )
}

export default Login
