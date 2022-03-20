const { ApolloServer } = require('apollo-server');
const { readFileSync } = require('fs')
const config = require('./config')
const ListingTypeDefs = require('./types/ListingTypes')
const resolvers = require('./resolvers')
const {getUserFromToken, formatErrors} = require("./utils");

const typeDefs = readFileSync('./src/types/schema.graphql').toString('utf-8')
const server = new ApolloServer({
  cors: {
    origin: '*'
  },
  /**
   * Merging types from different places
   */
  typeDefs: [ListingTypeDefs, typeDefs],
  resolvers,
  /**
   * Acts like a middleware. We are checking from authentication token and verifying it here.
   * That information will be passed down to all the resolver functions
   * @param req
   * @returns {{user: (*|null)}}
   */
  context: ({req}) => {
    const user = getUserFromToken(req.headers.authorization)
    return { user }
  },
  formatError: formatErrors
});

server.listen({ port: config.app.port }, () =>
  console.log(`Listening on http://localhost:${config.app.port}/graphql`)
);
