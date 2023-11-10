const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt

    //check json web token exists
    if (token) {
        jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
            if (err) {
                throw Error(err)
            }
            else {
                req.user = decodedToken
                next()
            }
        })
    }
    else {
        throw Error("Cookie not found")
    }
}



module.exports = { requireAuth }