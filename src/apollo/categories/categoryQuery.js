import { gql } from "@apollo/client";

export const CATEGORIES_LIST = gql`
  query CategoryListing {
    getAllCategories {
      id
      categoryName
      categoryDescription
    }
  }
`;
