const config = require('../config/config')
const jwt = require("jsonwebtoken");

module.exports = {
    signAccessToken: (_id, role) => {
        return new Promise((resolve, reject) => {
            const payload = { _id, role };
            const secret = config.jwtSecret;
            const option = {
                expiresIn: config.jwtExpiration
            }
            jwt.sign(payload, secret, option, (error, token) => {
                if (error) {
                    return reject(error.message)
                }
                return resolve(token)
            })
        })
    }
}