const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY,) {
        expressIn:'15d'
    }
}

module.exports = generateToken