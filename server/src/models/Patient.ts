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
  createdAt: string;
}

const patientSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reg_num: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export default model<PatientTypes>("Patient", patientSchema);
