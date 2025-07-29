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

export const GET_PAGINATED_PRODUCTS = gql`
  query GetPaginatedProducts($page: Int!, $limit: Int!) {
    getPaginatedProducts(page: $page, limit: $limit) {
      products {
        id
        productName
        category
        price
        image
      }
      totalCount
      totalPage
      currentPage
    }
  }
`;

export const GET_PRODUCT_COUNT = gql`
  query GetProductCount {
    getProductCount
  }
`;
