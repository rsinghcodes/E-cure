import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";

import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import MONGODB from "./config";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(async ({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
  try {
    await mongoose
      .connect(MONGODB)
      .then(() => console.log(`🗄️ Successfully connected to Database 🗄️`));
  } catch (error) {
    console.log(`🔥 An error ocurred when trying to connect with Database 🔥`);
    throw error;
  }
});

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => server.stop());
}
