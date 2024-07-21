import { GraphQLInt, GraphQLList, GraphQLString } from "graphql";
import { MessageType } from "../TypeDefs/Messages";
import { Scholarship } from "../../Entities/Scholarship";

export const CREATE_SCHOLARSHIP = {
  type: MessageType,
  args: {
    user_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    level_student: { type: GraphQLString },
    short_description: { type: GraphQLString },
    detailed_description: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    document_upload: { type: new GraphQLList(GraphQLString) },
    deadline: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const {
      user_id,
      name,
      level_student,
      short_description,
      detailed_description,
      banner_image,
      document_upload,
      deadline,
    } = args;

    await Scholarship.insert({
      user_id,
      name,
      level_student,
      short_description,
      detailed_description,
      banner_image,
      document_upload,
      deadline,
    });

    return {
      success: true,
      message: "SCHOLARSHIP CREATED",
    };
  },
};

export const UPDATE_SCHOLARSHIP = {
  type: MessageType,
  args: {
    id: { type: GraphQLInt },
    user_id: { type: GraphQLInt },
    name: { type: GraphQLString },
    level_student: { type: GraphQLString },
    short_description: { type: GraphQLString },
    detailed_description: { type: GraphQLString },
    banner_image: { type: GraphQLString },
    document_upload: { type: new GraphQLList(GraphQLString) },
    deadline: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const {
      id,
      user_id,
      name,
      level_student,
      short_description,
      detailed_description,
      banner_image,
      document_upload,
      deadline,
    } = args;

    const scholar = await Scholarship.findOne({ where: { id: id } });

    if (!scholar) {
      return {
        success: false,
        message: "FAILED UPDATE",
      };
    }

    if (scholar) {
      await Scholarship.save({
        id,
        user_id,
        name,
        level_student,
        short_description,
        detailed_description,
        banner_image,
        document_upload,
        deadline,
      });
    }

    return {
      success: true,
      message: "SCHOLARSHIP UPDATED",
    };
  },
};
