const { gql } = require("@apollo/client");

export const ADD_PRODUCT = gql`
  mutation Add_Product($input: ProductInput!) {
    createProduct(input: $input) {
      productName
      image
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation Update_Product($id: ID!, $input: ProductUpdateInput) {
    updateProduct(id: $id, input: $input) {
      productName
      image
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation Delete_Product($id: ID!) {
    deleteProduct(id: $id)
  }
`;
