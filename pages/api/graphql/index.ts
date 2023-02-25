import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const properties = [
  {
    address: "1234 N 1st Str, 95120 CA",
  },
];

const typeDefs = gql`
  type Property {
    id: ID!
    address: String
    sqFeet: Int
  }

  type Query {
    getProperties: [Property]
  }

  type Mutation {
    addProperty(address: String): Property
  }
`;

const resolvers = {
  Query: {
    getProperties: () => {
      return properties;
    },
  },
  Mutation: {
    addProperty: (_, { address }) => {
      properties.push({ address });

      return { address };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
