import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $categoryName: String!
    $categoryDescription: String
    $categoryImage: String
  ) {
    createCategory(
      categoryName: $categoryName
      categoryDescription: $categoryDescription
      categoryImage: $categoryImage
    ) {
      categoryName
      categoryImage
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: ID!
    $categoryName: String!
    $categoryDescription: String
    $categoryImage: String
  ) {
    updateCategory(
      id: $id
      categoryName: $categoryName
      categoryDescription: $categoryDescription
      categoryImage: $categoryImage
    ) {
      categoryName
    }
  }
`;
