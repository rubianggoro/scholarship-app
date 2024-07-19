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

export const CREATE_SCHOLARSHIP = gql`
  mutation createScholarship(
    $user_id: Int!
    $name: String!
    $level_student: String!
    $short_description: String!
    $detailed_description: String!
    $banner_image: String!
    $document_upload: [String!]!
    $deadline: String!
  ) {
    createScholarship(
      user_id: $user_id
      name: $name
      level_student: $level_student
      short_description: $short_description
      detailed_description: $detailed_description
      banner_image: $banner_image
      document_upload: $document_upload
      deadline: $deadline
    ) {
      success
      message
    }
  }
`;
