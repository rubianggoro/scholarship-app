import { GraphQLList, GraphQLString } from "graphql";
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

export const GET_APPLICANTS_BY_USER_ID = {
  type: new GraphQLList(ApplicantsType),
  args: { user_id: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await Applicants.find({
      where: { user_id: args.user_id },
      order: {
        id: "DESC",
      },
    });
  },
};
