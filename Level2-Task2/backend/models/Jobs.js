const mongoose = require('mongoose');
const {Schema} = mongoose

const JobsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    company:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true
    },
    skillsRequired:{
        type: [String],
        required: true
    },
    category:{
        type: String,
        required: true
    },
    salary:{
        type: String,
        required: true
    },
    applicationDeadline:{
        type: Date,
        required: true
    },
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'employer',
        required: true
    },
});

module.exports = mongoose.model('job', JobsSchema);