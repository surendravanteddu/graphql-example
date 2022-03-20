const  jwt = require('jsonwebtoken');
const { appToken } = require('../config')
const Logger = require("../utils/Logger")

/**
 * Generated authentication token (jwt). Reads expiration time and secret from .env file
 * @param payload
 * @returns {*}
 */
const generateToken = (payload) => {
    try {
        return jwt.sign(
            payload,
            appToken.secret,
            {
                expiresIn: appToken.expiresIn
            }
        );
    } catch (e) {
        Logger.error(e)
        throw new Error("Something went wrong")
    }
}

/**
 * Takes bearer token and returns user object. For invalid token return error
 * @param bearerToken
 * @returns {null|*}
 */
const getUserFromToken = (bearerToken) => {
    try {
        let token = bearerToken?.substr(bearerToken.indexOf("Bearer") + 7).trim()
        return jwt.verify(token, appToken.secret)
    } catch (e) {
        Logger.error(e)
        return null
    }
}

/**
 * This is wrapper function that takes a resolver and calls it only if the context contains a valid user.
 * This function helps us add security to the queries we desire
 *
 * @param resolver
 * @returns {function(*=, *=, *=, *=): *}
 */
const privateQuery = (resolver) => {
    return (parent, args, context, info) => {
        if (!context.user) {
            throw new Error("Invalid authorization")
        }
        return resolver(parent, args, context, info)
    }
}

/**
 * this function takes in the entire error object and returns just and error with message property.
 * this is because we don't need to show stack trace to the user.
 * @param error
 * @returns {{message}}
 */
const formatErrors = error => {
    return {
        message: error.message
    }
}

module.exports = {
    generateToken,
    getUserFromToken,
    privateQuery,
    formatErrors
}
