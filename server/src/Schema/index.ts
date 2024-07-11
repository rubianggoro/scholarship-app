import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import {
  CREATE_USER,
  DELETE_USER,
  LOGIN,
  UPDATE_PASSWORD,
} from "./Mutations/User";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAllUsers: GET_ALL_USERS,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: CREATE_USER,
    deleteUser: DELETE_USER,
    updatePassword: UPDATE_PASSWORD,
    login: LOGIN,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
