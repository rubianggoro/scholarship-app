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

export const GET_SCHOLARSHIP_DASHBOARD_BY_ID = gql`
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
      applicants {
        id
        name
        last_education
        short_self_desc
        document_upload
        status
      }
    }
  }
`;

export const GET_SCHOLARSHIP_BY_USER_ID = gql`
  query getScholarByUserId($user_id: String!) {
    getScholarByUserId(user_id: $user_id) {
      id
      name
      level_student
      deadline
    }
  }
`;

export const GET_APPLICANTS_BY_USER_ID = gql`
  query getApplicantsByUserId($user_id: String!) {
    getApplicantsByUserId(user_id: $user_id) {
      id
      name
      status
      last_education
      document_upload
    }
  }
`;
