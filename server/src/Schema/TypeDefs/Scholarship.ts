import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
} from "graphql";
import { UserType } from "./User";
import { Users } from "../../Entities/Users";
import { GraphQLDateTime } from "graphql-iso-date";
import { Applicants } from "../../Entities/Applicants";
import { ApplicantsType } from "./Applicants";

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
    deadline: { type: GraphQLDateTime },
    applicants: {
      type: new GraphQLList(ApplicantsType),
      resolve(parent, args) {
        return Applicants.find({ where: { scholarship_id: parent.id } });
      },
    },
    user: {
      type: UserType,
      resolve(parent, args) {
        return Users.findOne({ where: { id: parent.user_id } });
      },
    },
  }),
});
