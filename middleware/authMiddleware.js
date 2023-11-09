const jwt = require('jsonwebtoken');
const User = require('../models/user')
const SECRET = 'this is my secret find it if you can'

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check json web token exists
    if (token) {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message)
                res.redirect('/login')
            }
            else {
                console.log(decodedToken)
                next()
            }
        })
    }
    else {
        res.redirect('/login')
    }
}



module.exports = { requireAuth }