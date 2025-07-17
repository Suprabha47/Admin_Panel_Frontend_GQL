import { gql } from "@apollo/client";

export const ORDER_LISTING = gql`
  query GetAllOrders {
    getAllOrders {
      id
      createdAt
      status
      totalAmount
      customer {
        customerName
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    getOrder(id: $id) {
      customer {
        customerName
      }
      items {
        itemName
        price
        quantity
      }
      status
      shippingAddress {
        address
        city
        pinCode
        country
      }
    }
  }
`;
