
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;


const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, {
        expiresIn: maxAge
    })
}

const signup = async (req, res) => {
    const { email, password, username, phone, address } = req.body;
    const user = await User.create({ email, password, username, phone, address })
    const token = createToken(user.id)
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(201).json({ user: user._id })
}

const login = async (req, res) => {
    const { email, password, remember } = req.body;

    const user = await User.login(email, password)
    const token = createToken(user.id)
    if (!remember) res.cookie('jwt', token, { httpOnly: true })
    else res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id })
}


module.exports = {
    signup,
    login
}