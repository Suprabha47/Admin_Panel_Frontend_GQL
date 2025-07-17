import { gql } from "@apollo/client";

export const CREATE_CUSTOMER = gql`
  mutation Create_Customer($input: CustomerInput!) {
    createCustomer(input: $input) {
      customerName
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation Delete_Customer($id: ID!) {
    deleteCustomer(id: $id)
  }
`;
