
const handleErrors = (err) => {
    let errors = { email: '', password: '' };

    //incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'that email is not registered'
    }

    //incorrect password
    else if (err.message === 'incorrect password') {
        errors.password = 'that password is incorrect'
    }

    //duplicate error code
    else if (err.code === 11000) {
        errors.email = "that email is already registered"
    }
    // validation errors
    else { return err.message }
    return errors;
}

const errorMiddleware = (err, req, res, next) => {
    return res.status(500).json({ message: handleErrors(err) });
}

module.exports = errorMiddleware;