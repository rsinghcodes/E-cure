import { Schema, Document, model } from "mongoose";

export interface DoctorTypes extends Document {
  _doc: object;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  reg_num: string;
  specialization: string;
  hospital_name: string;
  phone: string;
  age: string;
  gender: string;
  address: string;
  createdAt: string;
}

const doctorSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  reg_num: { type: String, required: true },
  specialization: { type: String, required: true },
  hospital_name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  createdAt: { type: String, required: true },
});

export default model<DoctorTypes>("Doctor", doctorSchema);
