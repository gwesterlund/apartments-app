import gql from "graphql-tag";

export const GET_PROPERTIES = gql`
  {
    result: getProperties {
      id
      type
      displayName
      address {
        street
      }
      rentalUnits {
        type
        displayName
        address {
          street
        }
      }
    }
  }
`;

export const GET_PROPERTY = gql`
  query GetProperty($id: ID) {
    result: getProperty(id: $id) {
      id
      type
      displayName
      address {
        street
      }
      rentalUnits {
        type
        displayName
        address {
          street
        }
      }
    }
  }
`;

export const SEARCH_PROPERTIES = gql`
  query SearchProperties($zip: String) {
    result: searchProperties(zip: $zip) {
      id
      type
      displayName
      address {
        street
      }
      rentalUnits {
        type
        displayName
        address {
          street
        }
      }
    }
  }
`;

export const CREATE_PROPERTY = gql`
  mutation CreateProperty($data: PropertyInput) {
    createProperty(data: $data) {
      type
      displayName
      address {
        street
      }
      rentalUnits {
        type
        displayName
        address {
          street
        }
      }
    }
  }
`;
