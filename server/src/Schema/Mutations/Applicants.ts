import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { MessageType } from "../TypeDefs/Messages";
import { Scholarship } from "../../Entities/Scholarship";
import { Applicants } from "../../Entities/Applicants";

export const CREATE_APPLICANTS = {
  type: MessageType,
  args: {
    user_id: { type: GraphQLInt },
    scholarship_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    last_education: { type: GraphQLString },
    short_self_desc: { type: GraphQLString },
    document_upload: { type: GraphQLString },
    status: { type: GraphQLInt },
  },
  async resolve(parent: any, args: any) {
    const {
      user_id,
      scholarship_id,
      name,
      last_education,
      short_self_desc,
      document_upload,
      status,
    } = args;

    await Applicants.insert({
      user_id,
      scholarship_id,
      name,
      last_education,
      short_self_desc,
      document_upload,
      status,
    });

    return {
      success: true,
      message: "APPLICANTS CREATED",
    };
  },
};
