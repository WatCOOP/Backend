const express = require('express')
const router = express.Router()

const user = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const users = await user.find()
        res.json(users)
    } catch (err) { 
        res.send('GET Request Error: ' + err)
    }
})

router.get('/verify', async (req, res) => {
    try {
        const users = await user.find({ email: req.params.email, password: req.params.password })
        res.json(users)
    } catch (err) {
        res.send('GET Request Error: ' + err)
    }
})
router.post('/register', async (req, res) => {
    const newUser = new user({
        'email': req.params.email,
        'password': req.params.password
    })
    try {
        const savedUser = await newUser.save()
        res.json(savedUser)
    } catch (err) {
        res.send('POST Request Error: ' + err)
    }
})

module.exports = router