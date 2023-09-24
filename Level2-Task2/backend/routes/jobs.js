const express = require('express');
const router = express.Router();
const Job = require('../models/Jobs');
const Employer = require('../models/Employer');
var fetchuser = require('../middleware/fetchUser')

// view all jobs GET "api/jobs/"
router.get('/', async (req, res) => {
try {
    const jobs = await Job.find();

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }

})

// add a new job POST "/api/jobs/newjob"
router.post('/newjob', fetchuser, async (req, res) => {
    try {
      const {
        title,
        description,
        company,
        location,
        jobType,
        skillsRequired,
        category,
        salary,
        applicationDeadline,
      } = req.body;

    const employerId = req.user.id;
  
      const newJob = new Job({
        title,
        description,
        company,
        location,
        jobType,
        skillsRequired,
        category,
        salary,
        applicationDeadline,
        postedBy: employerId, // Use the ObjectId of the employer
      });
  
      const savedJob = await newJob.save();
      res.status(201).json(savedJob);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
});

// Get job by ID GET "/api/jobs/:id"
router.get('/:id', async (req, res) => {
    try {
      const jobId = req.params.id;
      const job = await Job.findById(jobId).populate('postedBy', 'company');
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.json(job);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  // Get jobs by category: GET "/api/jobs/category/:categoryName"
router.get('/category/:categoryName', async (req, res) => {
    try {
      const categoryName = req.params.categoryName.toLowerCase();
      const jobs = await Job.find({ category: {$regex: categoryName, $options: 'i'}}).populate('postedBy', 'company');
      res.json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  
  // Get jobs by location: GET "/api/jobs/location/:location"
  router.get('/location/:location', async (req, res) => {
    try {
      const location = req.params.location.toLowerCase();
      const jobs = await Job.find({ location: { $regex : location, $options: 'i'} }).populate('postedBy', 'company');
      res.json(jobs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

// GET jobs by category and location
router.get('/category/:category/location/:location', async (req, res) => {
  try {
    const { category, location } = req.params;

    const formattedLocation = location.toLowerCase();
    const formattedCategory = category.toLowerCase();
    const jobs = await Job.find({
      category: {$regex: formattedCategory, $options: 'i'},
      location: { $regex: formattedLocation, $options: 'i' },
    });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router