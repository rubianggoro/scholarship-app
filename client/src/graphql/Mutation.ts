import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $isStudent: Boolean!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      isStudent: $isStudent
    ) {
      success
      message
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
    }
  }
`;
