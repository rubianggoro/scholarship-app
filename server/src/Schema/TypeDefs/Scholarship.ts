import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";

export const ScholarshipType = new GraphQLObjectType({
  name: "Scholarship",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    level_student: { type: GraphQLString },
    short_description: { type: GraphQLString },
    detailed_description: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    document_upload: { type: new GraphQLList(GraphQLString) },
  }),
});
