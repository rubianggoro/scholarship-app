import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_USERS, GET_USER_BY_EMAIL } from "./Queries/User";
import {
  CREATE_USER,
  DELETE_USER,
  LOGIN,
  UPDATE_PASSWORD,
} from "./Mutations/User";
import { CREATE_SCHOLARSHIP } from "./Mutations/Scholarship";
import {
  GET_ALL_SCHOLARSHIP,
  GET_SCHOLARSHIP_BY_ID,
} from "./Queries/Scholarship";
import { GET_ALL_APPLICANTS } from "./Queries/Applicants";
import { CREATE_APPLICANTS } from "./Mutations/Applicants";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUserByEmail: GET_USER_BY_EMAIL,

    getAllScholarships: GET_ALL_SCHOLARSHIP,
    getScholarById: GET_SCHOLARSHIP_BY_ID,

    getAllApplicants: GET_ALL_APPLICANTS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
    login: LOGIN,

    createScholarship: CREATE_SCHOLARSHIP,

    createApplicants: CREATE_APPLICANTS,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
