import { GraphQLList, GraphQLString } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";

export const GET_ALL_USERS = {
  type: new GraphQLList(UserType),
  resolve() {
    return Users.find();
  },
};

export const GET_USER_BY_EMAIL = {
  type: UserType,
  args: { email: { type: GraphQLString } },
  async resolve(parent: any, args: any) {
    return await Users.findOne({ where: { email: args.email } });
  },
};
