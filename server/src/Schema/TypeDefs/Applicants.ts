import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { UserType } from "./User";
import { Users } from "../../Entities/Users";

export const ApplicantsType = new GraphQLObjectType({
  name: "Applicants",
  fields: () => ({
    id: { type: GraphQLID },
    user_id: { type: GraphQLInt },
    scholarship_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    last_education: { type: GraphQLString },
    short_self_desc: { type: GraphQLString },
    document_upload: { type: GraphQLString },
    status: { type: GraphQLInt },
  }),
});
