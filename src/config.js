require('dotenv').config()

/**
 *
 * We are reading the environment variables from .env and returning as an object
 */
const config = {
    app: {
        port: process.env.APP_PORT || 4000,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    },
    listingApi: {
        username: process.env.LISTING_USERNAME,
        password: process.env.LISTING_PASSWORD,
        baseUrl: process.env.LISTING_BASE_URL
    },
    appToken: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN
    },
    logging: {
        level: process.env.LOG_LEVEL,
        path: process.env.LOGFILE_PATH
    }
}

module.exports = config
