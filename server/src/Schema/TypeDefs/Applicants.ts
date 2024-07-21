import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from "graphql";
import { ScholarshipType } from "./Scholarship";
import { Scholarship } from "../../Entities/Scholarship";

export const ApplicantsType: any = new GraphQLObjectType({
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
    scholarship: {
      type: ScholarshipType,
      resolve(parent, args) {
        return Scholarship.findOne({ where: { id: parent.scholarship_id } });
      },
    },
  }),
});
