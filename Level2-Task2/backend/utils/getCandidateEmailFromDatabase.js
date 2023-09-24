const Candidate = require('../models/Candidate');   //import your Candidate model

// function to fetch candidate's email using userId
async function getCandidateEmailFromDatabase(userId) {
    try {
        // fetch the candidate document based on the userid
        const candidate = await Candidate.findById(userId);
        if (!candidate){
            throw new Error('Candidate not found');
        }
        return candidate.email;
    } catch (error) {
        throw error;
    }
}

module.exports = getCandidateEmailFromDatabase;