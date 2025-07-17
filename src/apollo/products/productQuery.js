import { gql } from "@apollo/client";

export const PRODUCT_LISTING = gql`
  query GetAllProducts {
    getAllProducts {
      id
      productName
      category
      price
      image
    }
  }
`;

export const PRODUCT_BY_ID = gql`
  query GetProduct($id: ID!) {
    getProduct(id: $id) {
      productName
      productDescription
      price
      discountPrice
      image
      category
      seoTitle
      seoDescription
    }
  }
`;
