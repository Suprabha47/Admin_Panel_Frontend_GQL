import { gql } from "@apollo/client";

export const CUSTOMER_LISTING = gql`
  query {
    getAllCustomers {
      customerName
      customerEmailAddress
      orders {
        totalAmount
      }
    }
  }
`;

export const CUSTOMER_BY_ID = gql`
  query GetCustomer($id: ID!) {
    getCustomer(id: $id) {
      customerName
      customerEmailAddress
      orders {
        id
        totalAmount
        status
        createdAt
      }
    }
  }
`;
