const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/user.model');


router.post('/login', (req, res) => {
    let fetchedUser;
    console.log(req.body);
    User.findOne({ email: req.body.email }).then(user => {
        if (!user) {
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
    }
    ).then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'Auth Failed'
            });
        }
        const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, 'rahulpurohitisthedev');
        return res.status(200).json({ token });
    }).catch(err => {
        console.log('ERRROR', err)
        return res.status(401).json({
            message: 'Auth Failed'
        });
    })
});

module.exports = router;