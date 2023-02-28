import { gql, ApolloServer } from "apollo-server-micro";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import Chance from "chance";

const chance = new Chance();

const properties = Array.apply(null, Array(100)).map((_, i) => ({
  id: (i + 1).toString(),
  type: "SINGLE_FAMILY_BUILDING",
  displayName: `Cozy House ${i + 1}`,
  address: {
    street: chance.address(),
    zip: chance.pickone(["95100", "95101", "95102", "95103", "95104"]),
    state: "CA",
  },
  rentalUnits: [
    {
      type: "ENTIRE_PROPERTY",
    },
  ],
}));

const typeDefs = gql`
  enum PropertyType {
    SINGLE_FAMILY_BUILDING
    MULTI_FAMILY_BUILDING
    LOW_RISE_APARTMENT_BUILDING
    HIGH_RISE_APARTMENT_BUILDING
    CONDOMINIUM
  }

  enum RentalUnitType {
    ENTIRE_PROPERTY
    INDIVIDUAL_UNIT
    ROOM
  }

  enum PropertyStatus {
    ACTIVE
    INACTIVE
  }

  enum RentalUnitStatus {
    VACANT
    OCCUPIED
    PENDING_RENOVATION
  }

  enum RentalApplicationStatus {
    PENDING
    APPROVED
    REJECTED
  }

  enum RentalAgreementStatus {
    ACTIVE
    INACTIVE
  }

  input PropertyInput {
    type: PropertyType
    displayName: String
    address: AddressInput
    owner: ContactInput
    manager: ContactInput
  }

  input RentalUnitInput {
    type: RentalUnitType
    displayName: String
    address: AddressInput
    owner: ContactInput
    manager: ContactInput
  }

  input AddressInput {
    street: String
    city: String
    zip: String
    state: String
    country: String
  }

  input ContactInput {
    id: ID
    displayName: String
    phone: String
    email: String
  }

  input RatingInput {
    score: Float
    feedback: String
  }

  type Address {
    street: String
    city: String
    zip: String
    state: String
    country: String
  }

  type Contact {
    id: ID!
    displayName: String
    phone: String
    email: String
  }

  type Rating {
    score: Float
    feedback: String
  }

  type Property {
    id: ID!
    type: PropertyType
    displayName: String
    address: Address
    status: PropertyStatus
    owner: Contact
    manager: Contact
    overallRating: Rating
    ratings: [Rating]
    rentalUnits: [RentalUnit]
  }

  type RentalUnit {
    id: ID!
    type: RentalUnitType
    displayName: String
    address: Address
    status: RentalUnitStatus
    owner: Contact
    manager: Contact
    overallRating: Rating
    ratings: [Rating]
    applications: [RentalApplication]
    agreements: [RentalAgreement]
  }

  type RentalApplication {
    id: ID!
    status: RentalApplicationStatus
  }

  type RentalAgreement {
    id: ID!
    status: RentalAgreementStatus
  }

  type RenterAccount {
    displayName: String
    contact: Contact
  }

  type Query {
    getProperties: [Property]
    getProperty(id: ID): Property
    searchProperties(zip: String): [Property]
  }

  type Mutation {
    createProperty(data: PropertyInput): Property
    createRentalUnit(data: RentalUnitInput): RentalUnit
  }
`;

const resolvers = {
  Query: {
    getProperties: () => {
      return properties;
    },
    getProperty: (_, { id }) => {
      return properties.find((e) => e.id === id);
    },
    searchProperties: (_, { zip }) => {
      return properties.filter((e) => e.address.zip === zip);
    },
  },
  Mutation: {
    createProperty: (_, { data }) => {
      properties.push(data);

      return data;
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
