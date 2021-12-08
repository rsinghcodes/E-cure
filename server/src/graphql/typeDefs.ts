const { gql } = require("apollo-server");

module.exports = gql`
  type Doctor {
    id: ID!
    name: String!
    email: String!
    password: String!
    reg_num: String!
    specialization: String!
    hospital_name: String!
    phone: String!
    age: String!
    address: String!
    mon: Boolean!
    tues: Boolean!
    wed: Boolean!
    thrus: Boolean!
    fri: Boolean!
    sat: Boolean!
    sun: Boolean!
  }
  type Patient {
    id: ID!
    name: String!
    email: String!
    password: String!
    phone: String!
    age: String!
    gender: String!
  }
  type Appointment {
    id: ID!
    doctor_name: String!
    patient_name: String!
    appointmentno: String!
    status: String!
    reason_for_appoint: String!
    date: String!
    day: String!
  }
  type Image {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type Query {
    testMessage: String!
  }
`;
