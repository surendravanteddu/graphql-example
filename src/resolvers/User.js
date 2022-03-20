const {app} = require("../config")
const {AuthenticationError} = require("apollo-server");
const {generateToken} = require("../utils");
const Logger = require("../utils/Logger")

/**
 * This function authenticate the user and returns jwt token
 * @param parent
 * @param args
 * @returns {*}
 */
const authenticateUser = (parent, args) => {
    try {
        Logger.info("User login attempt")
        const { user } = args
        /**
         * Since we don't have a db, we are checking user credentials against the hard coded values in the .env
         */
        if (user.username === app.username && user.password === app.password) {
            return generateToken({
                username: user.username
            })
        }
        /**
         * throws error if the credentials does not match
         */
        throw new AuthenticationError("Username and password mismatch")
    } catch (e) {
        Logger.error(e)
        /**
         * We need to show this error to the user. so we need to bubble this error up.
         */
        throw e
    }
}

module.exports = {
    authenticateUser
}
