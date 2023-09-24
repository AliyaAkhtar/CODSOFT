import React from 'react'
import './Job.css'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Job = () => {
    const [jobs, setJobs] = useState([]);
    const [hasPostedJobs, setHasPostedJobs] = useState(false);
    const [searchType, setSearchType] = useState('category'); // Default search by category
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                let apiUrl = 'http://localhost:5000/api/jobs/';
                const response = await fetch(apiUrl, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
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
        fetchJobs();
    }, []);

    const formatApplicationDeadline = (deadline) => {
        const date = new Date(deadline);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    // Function to search jobs by category or location
    const searchJobs = async () => {
        try {
            let apiUrl = `http://localhost:5000/api/jobs/${searchType}/${searchQuery}`;
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setSearchResults(data);
            } else {
                console.error('Failed to fetch search results:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className='job-list' id='jobs'>
            {/* Search type selection */}
            <div className='search-type'>
            <label>
                <input
                    type='radio'
                    value='category'
                    checked={searchType === 'category'}
                    onChange={() => setSearchType('category')}
                />
                Search by Category
            </label>
            <label>
                <input
                    type='radio'
                    value='location'
                    checked={searchType === 'location'}
                    onChange={() => setSearchType('location')}
                />
                Search by Location
            </label>
            </div>

            {/* Search input field and button */}
            <div className='search-container'>
                <input
                    type='text'
                    placeholder={`Search by ${searchType === 'category' ? 'Category' : 'Location'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={searchJobs} className='search'>Search</button>
            </div>

            {searchResults.length > 0 ? (
                // Display search results if available
                <ul>
                    {searchResults.map((job) => (
                        <li key={job._id}>
                            <div className='job-card'>
                            <div className='job-name'>
                                <div className='job-detail'>
                                    <h4 className='job-title'>{job.title}</h4>
                                    <h3 className='company-name'>{job.company}</h3>
                                    <p className='description'>Description: {job.description}</p>
                                    <p className='salary description'>Salary:  {job.salary}</p>
                                    <p className='category description'>Category:  {job.category}</p>
                                    <p className='location description'>Location: {job.location}</p>
                                    <p className='skills description'>Skills Required: {job.skillsRequired.join(', ')}</p>
                                </div>
                            </div>
                            <div>
                                <Link className='apply-now' to={`/apply/${job._id}`} key={job._id}>
                                    Apply Now
                                </Link>
                            </div>
                            <div className='job-deadline'>
                                Application Deadline: {formatApplicationDeadline(job.applicationDeadline)}
                            </div>
                        </div>
                        </li>
                    ))}
                </ul>
            ) : hasPostedJobs?(
        <ul>
            {
                jobs.map((job) => (
                    <li key={job._id}>
                        <div className='job-card'>
                            <div className='job-name'>
                                <div className='job-detail'>
                                    <h4 className='job-title'>{job.title}</h4>
                                    <h3 className='company-name'>{job.company}</h3>
                                    <p className='description'>Description: {job.description}</p>
                                    <p className='salary description'>Salary:  {job.salary}</p>
                                    <p className='category description'>Category:  {job.category}</p>
                                    <p className='location description'>Location: {job.location}</p>
                                    <p className='skills description'>Skills Required: {job.skillsRequired.join(', ')}</p>
                                </div>
                            </div>
                            <div>
                                <Link className='apply-now' to={`/apply/${job._id}`} key={job._id}>
                                    Apply Now
                                </Link>
                            </div>
                            <div className='job-deadline'>
                                Application Deadline: {formatApplicationDeadline(job.applicationDeadline)}
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    ): (
        <p>No jobs posted</p>
    )
}
    </section >
  )
}

export default Job;