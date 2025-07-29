import { gql } from "@apollo/client";

export const CUSTOMER_LISTING = gql`
  query {
    getAllCustomers {
      id
      customerName
      location
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
      location
      orders {
        id
        totalAmount
        status
        createdAt
        shippingAddress {
          address
          city
          pinCode
          country
        }
      }
    }
  }
`;
export const GET_CUSTOMER_COUNT = gql`
  query GetCustomerCount {
    getCustomerCount
  }
`;

export const GET_TOP_CUSTOMERS = gql`
  query GetTopCustomers {
    getTopCustomers {
      id
      customerName
      orders {
        totalAmount
      }
    }
  }
`;
