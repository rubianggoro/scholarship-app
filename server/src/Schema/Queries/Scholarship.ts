import { GraphQLList, GraphQLString } from "graphql";
import { Scholarship } from "../../Entities/Scholarship";
import { ScholarshipType } from "../TypeDefs/Scholarship";
import { Users } from "../../Entities/Users";

export const GET_ALL_SCHOLARSHIP = {
  type: new GraphQLList(ScholarshipType),
  async resolve() {
    return Scholarship.find({
      order: {
        id: "DESC",
      },
    });
  },
};

export const GET_SCHOLARSHIP_BY_ID = {
  type: ScholarshipType,
  args: { id: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await Scholarship.findOne({ where: { id: args.id } });
  },
};
