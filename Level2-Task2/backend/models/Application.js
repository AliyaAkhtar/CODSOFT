const mongoose = require('mongoose')
const {Schema} = mongoose
const ApplicationSchema = new Schema({
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true
    },
    candidateEmail: {
        type: String, 
        required: true
      },
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    phoneNumber: {
        type: String,
        required: true
      },
    highestDegree: {
        type: String,
        required: true
      },
    cgpa: {
        type: Number,
        required: true
      },
    resume:{
        type:String,
        required: true
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('application', ApplicationSchema);