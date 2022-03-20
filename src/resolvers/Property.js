const simplyRetsInstance = require('../integrations/SimplyRETS')
const Logger = require("../utils/Logger")

/**
 * Here we are making a call to our SimpleRETS integration function.
 * @param parent
 * @param args
 * @param context
 * @returns {Promise<*[]|*>}
 */
const getProperties = async (parent, args, context) => {
    try {
        /**
         * We get the city value from the query
         */
        const { city } = args
        /**
         * we get the user from authentication token and set in the context
         */
        const { user } = context
        Logger.info(`Requested properties from city: ${city} by user: ${user.username}`)
        return await simplyRetsInstance.getProperties(city)
    } catch (e) {
        Logger.log(e)
        throw e
    }
}

module.exports = {
    getProperties
}
