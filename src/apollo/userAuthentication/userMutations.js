import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      firstName
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    signUp(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    )
  }
`;

export const GOOGLE_AUTH = gql`
  mutation GoogleAuth(
    $googleId: String!
    $firstName: String
    $lastName: String
    $photoUrl: String
  ) {
    googleAuth(
      googleId: $googleId
      firstName: $firstName
      lastName: $lastName
      photoUrl: $photoUrl
    ) {
      firstName
      photoUrl
    }
  }
`;
