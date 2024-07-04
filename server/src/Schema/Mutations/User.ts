import { GraphQLBoolean, GraphQLID, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Messages";
import { IUser } from "../../types";

export const CREATE_USER = {
  type: MessageType,
  args: {
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    isStudent: { type: GraphQLBoolean },
  },
  async resolve(parent: any, args: IUser) {
    const { name, email, password, isStudent } = args;
    const user = await Users.findOne({ where: { email: email } });

    if (user) {
      return {
        success: false,
        message: "USERNAME EXISTING",
      };
    }

    if (!user) {
      await Users.insert({
        name,
        email,
        password,
        isStudent,
      });
    }

    return {
      success: true,
      message: "USER CREATED",
    };
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    email: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { email, oldPassword, newPassword } = args;
    const user = await Users.findOne({ where: { email: email } });
    if (!user) {
      throw new Error("USERNAME DOESNT EXIST");
    }
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      await Users.update({ email: email }, { password: newPassword });
      return {
        success: true,
        message: "PASSWORD UPDATED",
      };
    } else {
      throw new Error("PASSWORDS DO NOT MATCH!");
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);

    return {
      success: true,
      message: "DELETE USER SUCCESS",
    };
  },
};
