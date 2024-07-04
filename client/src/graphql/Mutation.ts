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
