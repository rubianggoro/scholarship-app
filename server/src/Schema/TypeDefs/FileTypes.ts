import { GraphQLBoolean, GraphQLObjectType, GraphQLString } from "graphql";

export const FileTypes = new GraphQLObjectType({
  name: "File",
  fields: () => ({
    success: { type: GraphQLBoolean },
    url: { type: GraphQLString },
  }),
});
