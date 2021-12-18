import { Schema, Document, model } from "mongoose";

export interface DoctorTypes extends Document {
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
}

const doctorSchema = new Schema(
  {
    fullname: String,
    email: String,
    password: String,
    reg_num: String,
    specialization: String,
    hospital_name: String,
    phone: String,
    age: String,
    gender: String,
    address: String,
  },
  { timestamps: true }
);

export default model<DoctorTypes>("Doctor", doctorSchema);
