import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login'
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Job from './components/Job';
import Employer from './components/Employer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobPost from './components/JobPost';
import Apply from './components/Apply';
import Candidate from './components/Candidate';

function App() {
  return (
    <>
   <Router>
    <Navbar/>
    <ToastContainer/>
    <Routes>
       <Route exact path="/" element={<Home/>}/>
       <Route exact path="/login" element={<Login/>}/>
       <Route exact path="/signup" element={<SignUp/>}/>
       <Route exact path='/jobs' element={<Job/>}/>
       <Route exact path='/employer' element={<Employer/>}/>
       <Route exact path='/postjob' element={<JobPost/>}/>
       <Route path="/apply/:jobId" element={<Apply/>}/>
       <Route path='/candidate' element={<Candidate/>}/>
    </Routes>
    <Footer/>
    </Router>
    </>
  );
}

export default App;
