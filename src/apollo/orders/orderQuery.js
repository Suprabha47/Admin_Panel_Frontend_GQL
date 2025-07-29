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

export const GET_PAGINATED_ORDERS = gql`
  query GetPaginatedOrders($page: Int!, $limit: Int!) {
    getPaginatedOrders(page: $page, limit: $limit) {
      orders {
        id
        createdAt
        status
        totalAmount
        customer {
          customerName
        }
      }
      totalCount
      totalPage
      currentPage
    }
  }
`;

export const GET_ORDER_COUNT = gql`
  query GetOrderCount {
    getOrderCount
  }
`;

export const GET_ORDER_TOTAL = gql`
  query GetOrderTotal {
    getOrderTotal
  }
`;
