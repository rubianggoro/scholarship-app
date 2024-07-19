import { gql } from "@apollo/client";

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      name
      isStudent
    }
  }
`;

export const GET_ALL_SCHOLARSHIP = gql`
  query {
    getAllScholarships {
      id
      name
      banner_image
      short_description
    }
  }
`;

export const GET_SCHOLARSHIP_BY_ID = gql`
  query getScholarById($id: String!) {
    getScholarById(id: $id) {
      id
      name
      level_student
      short_description
      detailed_description
      banner_image
      document_upload
      deadline
      user {
        name
      }
    }
  }
`;
