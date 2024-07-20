import { GraphQLList } from "graphql";
import { ApplicantsType } from "../TypeDefs/Applicants";
import { Applicants } from "../../Entities/Applicants";

export const GET_ALL_APPLICANTS = {
  type: new GraphQLList(ApplicantsType),
  async resolve() {
    return Applicants.find({
      order: {
        id: "DESC",
      },
    });
  },
};

// export const GET_SCHOLARSHIP_BY_ID = {
//   type: ScholarshipType,
//   args: { id: { type: GraphQLString } },
//   async resolve(parent: any, args: any) {
//     return await Scholarship.findOne({ where: { id: args.id } });
//   },
// };
