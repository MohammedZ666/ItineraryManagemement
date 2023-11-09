
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const SECRET = 'DAEXQSQQ'
const maxAge = 3 * 24 * 60 * 60;


const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxAge
    })
}

const handleErrors = (err) => {
    console.log(err.code, err.message)
    let errors = { email: '', password: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    //incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    //duplicate error code
    if (err.code === 11000) {
        errors.email = "that email is already registered"
        return errors;
    }
    console.log(err.message)
    // validation errors
    if (err.message.includes('failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}


const signup = async (req, res) => {
    const { email, password, username, phone, address } = req.body;
    try {
        const user = await User.create({ email, password, username, phone, address })
        console.log(user)
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ user: user._id })
    } catch (error) {
        const errors = handleErrors(error)
        res.status(404).json(errors)
    }

}

const login = async (req, res) => {
    const { email, password, remember } = req.body;

    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)

        if (!remember) res.cookie('jwt', token, { httpOnly: true })
        else res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(200).json({ user: user._id })

    } catch (err) {
        const errors = handleErrors(err)
        console.log(err)
        res.status(400).json(errors)
    }
}


module.exports = {
    signup,
    login
}