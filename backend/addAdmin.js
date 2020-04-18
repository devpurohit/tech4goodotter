const User = require('./models/user');
const bcrypt = require('bcrypt');



bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: "admin@tech4good.com",
            password: hash
        });
        user.save().then(res => {
            console.log(res);
        });
    })
