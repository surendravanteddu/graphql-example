const { getProperties } = require("./Property")
const { authenticateUser } = require("./User")
const { privateQuery } = require("../utils")

const index = {
  Query: {
    /**
     * Query to get properties
     */
    properties: privateQuery(getProperties),
    /**
     * Query to authenticate user
     */
    login: authenticateUser
  },
};

module.exports = index
