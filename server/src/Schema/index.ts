import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_USERS, GET_USER_BY_EMAIL } from "./Queries/User";
import {
  CREATE_USER,
  DELETE_USER,
  LOGIN,
  UPDATE_PASSWORD,
} from "./Mutations/User";
import { CREATE_SCHOLARSHIP } from "./Mutations/Scholarship";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
    getUserByEmail: GET_USER_BY_EMAIL,
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
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
