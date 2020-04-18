const express = require('express')
const router = express.Router()

const Analytics = require('../models/analytics.model')


router.post('/add', (req, res) => {
    const currLog = new Analytics({ ...req.body })
    currLog.save(data => {
        res.status(201).json({ message: `${req.body.ip} logged.` })
    })
})

router.get('/getAll', (req, res) => {
    const year = req.query.year
    Analytics.find({ year })
        .then(posts => {
            if (posts) {
                res.status(200).json(posts)
            }
            else {
                res.statusCode(404).json({ message: "Posts not found." })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/getOuterLine', (req, res) => {
    const year = req.query.year
    console.log(year)
    Analytics.find({ year })
        .then(logs => {
            if (logs) {
                res.status(200).json(formatOuterLineData(logs))
            }
            else {
                res.statusCode(404).json({ message: "Posts not found." })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/getChart', (req, res) => {
    const year = req.query.year
    Analytics.find({ year })
        .then(logs => {
            if (logs) {
                res.status(200).json(formatChartData(logs))
            }
            else {
                res.statusCode(404).json({ message: "Posts not found." })
            }
        })
        .catch(err => {
            console.log(err)
        })
})

function formatOuterLineData(logs) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const outerPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // For prod
    // const outerPoints = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    // Getting InnerLine and OuterLine values
    logs.forEach((log) => {
        outerPoints[months.indexOf(log.month.slice(0, 3))]++
    })

    return outerPoints.map((p, index) => {
        const monthIndex = index
        const label = months[monthIndex]
        return {
            label,
            value: p,
        }
    })

}

function formatChartData(logs) {
    const value = [0, 0]
    value[1] = logs.length
    const uniqueIps = [...new Set(logs.map(item => item.ip))]
    const uniqueIpsLength = uniqueIps.length
    value[0] = Math.floor((uniqueIpsLength / value[1]) * 100)
    return value
}

module.exports = router