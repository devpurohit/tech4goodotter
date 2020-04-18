const express = require('express')
const router = express.Router()

const Ngo = require('../models/ngo.model')

router.post('/add', (req, res) => {
    const newNgo = new Ngo({ ...req.body })
    newNgo.save(data => {
        res.status(201).json({ message: `${req.body.name} saved.` })
    })
})

router.get('/getAll', (req, res) => {
    Ngo.find({})
        .then(ngos => {
            if (ngos) {
                res.status(200).json(ngos)
            }
            else {
                res.statusCode(404).json({ message: "Ngo not found." })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router