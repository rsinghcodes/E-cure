import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import PatientTypes from "./Patient.interface";

const patientSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reg_num: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
  },
  { timestamps: true }
);

patientSchema.pre<PatientTypes>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

patientSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<PatientTypes>("Patient", patientSchema);
