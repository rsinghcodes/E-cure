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

  type Patient {
    id: ID!
    fullname: String!
    email: String!
    token: String!
    reg_num: String!
    phone: String!
    age: String!
    gender: String!
    createdAt: String!
    updatedAt: String!
  }

  input PatientRegisterInput {
    fullname: String!
    email: String!
    password: String!
    confirmPassword: String!
    reg_num: String!
    phone: String!
    age: String!
    gender: String!
  }

  type Query {
    getDoctors: [Doctor]
    getPatients: [Patient]
    getSpecialization(specialization: String!): [Doctor]
  }
  type Mutation {
    registerDoctor(doctorRegisterInput: DoctorRegisterInput): Doctor!
    registerPatient(patientRegisterInput: PatientRegisterInput): Patient!
    deleteDoctor(doctorId: ID!): String!
    deletePatient(patientId: ID!): String!
    loginDoctor(email: String!, password: String!): Doctor
    loginPatient(email: String!, password: String!): Patient
  }
`;
