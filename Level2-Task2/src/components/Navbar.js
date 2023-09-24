import React from 'react'
import './Nav.css'
import { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Navbar = () => {

  const [scroll, setScroll] = useState(0);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Track user's login status
  // const [userRole, setUserRole] = useState(null); // Track user's role (candidate, employer, or null)
  // const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navbarStyle = {
    background: scroll > 150 ? 'gray' : 'rgb(158, 137, 137)',
    boxShadow: scroll > 150 ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : 'none',
    transition: 'background 0.3s, box-shadow 0.3s', // Add a smooth transition effect
  };

  // const handleLogout = () => {
  //   // Implement your logout logic here (e.g., clear authentication token)
  //   // Update isLoggedIn and userRole accordingly
  //   setIsLoggedIn(false);
  //   setUserRole(null);
  //   navigate('/');
  // };
  return (
    <div className='navbar' style={navbarStyle}>
        <h1 className='navbar-logo'><Link to='/'>JOB BOARD</Link></h1>
        <div className='navbar-menu'>
        {/* {isLoggedIn && userRole === 'candidate' && <Link to='/jobs'>Jobs</Link>}
        {isLoggedIn && userRole === 'candidate' && <Link to='/candidate'>Candidate</Link>}
        {isLoggedIn && userRole === 'employer' && <Link to='/employer'>Employee</Link>}
        {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        {!isLoggedIn && <Link to="/login">Login</Link>}
        {!isLoggedIn && <Link to="/signup">Sign Up</Link>} */}
            <Link to='/jobs'>Jobs</Link>
            <Link to='/candidate'>Candidate</Link>
            <Link to='/employer'>Employee</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
        </div>
        <div className='menu-toggle'>
            <span className='bar'></span>
            <span className='bar'></span>
            <span className='bar'></span>
        </div>
    </div>
  )
}

export default Navbar;