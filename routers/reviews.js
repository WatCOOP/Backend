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

router.get('/companyRoleDetails', async(req, res) => {
    try {
        const reviews = await review.find({ companyName: "Apple", jobTitle: "Software Engineer"})
        const lengthOfReviews = reviews.length
        

        //get average salary in reviews
        let totalSalary = 0
        for(let i = 0; i < lengthOfReviews; i++){
            totalSalary += reviews[i].salary
        }
        let averageSalary = totalSalary / lengthOfReviews
        // get averageOpportunitiesToNetwork
        let totalOpportunitiesToNetwork = 0
        for(let i = 0; i < lengthOfReviews; i++){
            totalOpportunitiesToNetwork += reviews[i].oppertunitiesToNetwork
        }
        let averageOpportunitiesToNetwork = totalOpportunitiesToNetwork / lengthOfReviews
        // get averageOpportunitiesToLearn
        let totalOpportunitiesToLearn = 0
        for(let i = 0; i < lengthOfReviews; i++){
            totalOpportunitiesToLearn += reviews[i].oppertunitiesToLearn
        }
        let averageOpportunitiesToLearn = totalOpportunitiesToLearn / lengthOfReviews
        averageSalary = averageSalary.toFixed(2)
        averageOpportunitiesToNetwork = averageOpportunitiesToNetwork.toFixed(2)
        averageOpportunitiesToLearn = averageOpportunitiesToLearn.toFixed(2)

        res.json({
            reviews,
            lengthOfReviews,
            averageSalary,
            averageOpportunitiesToNetwork,
            averageOpportunitiesToLearn
        })

    } catch (err) {
        res.send('GET Request Error: ' + err)
    }
})

router.get('/:companyName', async(req, res) => {
    try {
        // find where companyName in the url is a substring of the companyName in the database
        const reviews = await review.find({ companyName: { $regex: req.params.companyName, $options: 'i' } })
        res.json(reviews)
    } catch (err) {
        res.send('GET Request Error: ' + err)
    }
})

router.get('/id/:id', async(req, res) => {
    try {
        const reviews = await review.findById(req.params.id)
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
        review: req.body.review,
        oppertunitiesToNetwork: req.body.oppertunitiesToNetwork,
        oppertunitiesToLearn: req.body.oppertunitiesToLearn,
        interviewProcess: req.body.interviewProcess,
        extraCompensation: req.body.extraCompensation,
    })
    try {
        const savedReview = await newReview.save()
        res.json(savedReview)
    } catch (err) {
        res.send('POST Request Error: ' + err)
    }
})


module.exports = router