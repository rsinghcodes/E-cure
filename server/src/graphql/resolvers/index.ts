import doctorResolvers from "./doctor";

export default {
  Query: {
    ...doctorResolvers.Query,
  },
  Mutation: {
    ...doctorResolvers.Mutation,
  },
};
