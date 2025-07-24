import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      user {
        firstName
      }
      token
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
    $email: String!
    $photoUrl: String
  ) {
    googleAuth(
      googleId: $googleId
      firstName: $firstName
      lastName: $lastName
      email: $email
      photoUrl: $photoUrl
    ) {
      user {
        firstName
        email
        photoUrl
      }
      token
    }
  }
`;
