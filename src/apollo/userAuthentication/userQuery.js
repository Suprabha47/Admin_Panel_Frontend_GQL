import { gql } from "@apollo/client";

export const GET_USER_COUNT = gql`
  query GetUserCount {
    getUserCount
  }
`;
