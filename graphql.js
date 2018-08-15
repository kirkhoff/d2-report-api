const { ApolloServer, gql } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Resolver functions for schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello World'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false
  }
});
