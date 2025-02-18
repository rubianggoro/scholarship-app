import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import { schema } from "./Schema";
import { createConnection } from "typeorm";
import { Users } from "./Entities/Users";
import { Scholarship } from "./Entities/Scholarship";
import { Applicants } from "./Entities/Applicants";

const main = async () => {
  await createConnection({
    type: "mysql",
    database: "graphqlcrud",
    username: "root",
    password: "",
    logging: true,
    synchronize: false,
    entities: [Users, Scholarship, Applicants],
  });
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true,
    })
  );

  app.listen(3001, () => {
    console.log("SERVER RUNNING ON PORT 3001");
  });
};

main().catch((err) => {
  console.log(err);
});
