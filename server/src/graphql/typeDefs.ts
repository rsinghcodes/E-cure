import { gql } from "apollo-server";

export default gql`
  type Doctor {
    id: ID!
    fullname: String!
    email: String!
    token: String!
    reg_num: String!
    specialization: String!
    hospital_name: String!
    phone: String!
    age: String!
    gender: String!
    address: String!
    createdAt: String!
    updatedAt: String!
  }

  input DoctorRegisterInput {
    fullname: String!
    email: String!
    password: String!
    confirmPassword: String!
    reg_num: String!
    specialization: String!
    hospital_name: String!
    phone: String!
    age: String!
    gender: String!
    address: String!
  }

  type Query {
    getDoctors: [Doctor]
    getSpecialization(specialization: String!): [Doctor]
  }
  type Mutation {
    registerDoctor(doctorRegisterInput: DoctorRegisterInput): Doctor!
    deleteDoctor(doctorId: ID!): String!
  }
`;
