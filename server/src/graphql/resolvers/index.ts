import doctorResolvers from "./doctor";
import patientResolvers from "./patient";

export default {
  Query: {
    ...doctorResolvers.Query,
    ...patientResolvers.Query,
  },
  Mutation: {
    ...doctorResolvers.Mutation,
    ...patientResolvers.Mutation,
  },
};
