import { Schema, Document, model } from "mongoose";

export interface PatientTypes extends Document {
  _doc: object;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  reg_num: string;
  phone: string;
  age: string;
  gender: string;
}

const patientSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    reg_num: String,
    phone: String,
    age: String,
    gender: String,
  },
  { timestamps: true }
);

export default model<PatientTypes>("Patient", patientSchema);
