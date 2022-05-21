const express = require('express')
const router = express.Router()

const review = require('../models/review')

router.get('/', async(req, res) => {
    try {
        const reviews = await review.find()
        res.json(reviews)
    } catch (err) {
        res.send('GET Request Error: ' + err)
    }
})

router.get('/:companyName', async(req, res) => {
    try {
        const reviews = await review.find({companyName: req.params.companyName})
        res.json(reviews)
    } catch (err) {
        res.send('GET Request Error: ' + err)
    }
})


router.post('/', async(req, res) => {
    const newReview = new review({
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        salary: req.body.salary,
        datePosted: req.body.datePosted,
        review: req.body.review
    })
    try {
        const savedReview = await newReview.save()
        res.json(savedReview)
    } catch (err) {
        res.send('POST Request Error: ' + err)
    }
})


module.exports = router