require('dotenv').config()

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_TOKEN_KEY: process.env.SECRET_TOKEN_KEY,
    EXPIRY: process.env.EXPIRY
}