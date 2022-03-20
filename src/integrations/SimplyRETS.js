const axios = require('axios')
const { listingApi } = require("../config")
const Logger = require("../utils/Logger")

/**
 * Description - Creating axios client
 * @type {AxiosInstance}
 */
const client = axios.create({
    baseURL: listingApi.baseUrl,
    auth: {
        username: listingApi.username,
        password: listingApi.password
    },
});

/**
 * Calling SimpleRETS api to get listings by city
 * @param city
 * @returns {Promise<*[]|any>}
 */
const getProperties = async (city) => {
    try {
        const params = { cities: city}
        const properties = await client.get("/properties", { params })
        return  properties.data
    } catch (e) {
        /**
         * We are calling a 3rd party api. When that service is down or throwing error we can log the error and send user an empty array.
         * To enhance this We can send error emails to our support so that we will know when this error occurs.
         */
        Logger.error(e)
        return []
    }
}

module.exports = {
    getProperties
}
