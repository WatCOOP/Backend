const mongoose = require('mongoose')


const review = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    datePosted: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('Reviews', review)