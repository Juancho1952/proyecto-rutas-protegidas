const checkUserCredential = require('./auth.controller')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config').api.jwtSecret


const postLogin = (req, res) => {

    const { email, password } = req.body

    if (email && password) {
        checkUserCredential(email, password)
            .then((data) => {
                if (data) {
                    const token = jwt.sign({
                        id: data.id,
                        email: data.email,
                        role: data.role
                    }, jwtSecret)

                    res.status(200).json({
                        message: 'Correct Credentials',
                        token
                    })
                } else {
                    res.status(401).json({ message: 'mising Data' })
                }
            })
            .catch((error) => {
                res.status(400).json({ message: error.message })
            })
    } else {
        res.status(400).json({
            message: 'Missing Data',
            fields: {
                email: 'example@example.com',
                password: 'string'
            }
        })
    }
}

module.exports = {
    postLogin
}