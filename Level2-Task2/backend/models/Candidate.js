const mongoose = require('mongoose')
const {Schema} = mongoose

const CandidateSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const Candidate = mongoose.model('candidate', CandidateSchema);
module.exports = Candidate;