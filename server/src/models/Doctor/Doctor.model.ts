import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import { DoctorTypes } from "./Doctor.interface";

const doctorSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    reg_num: { type: String, required: true, unique: true },
    specialization: { type: String, required: true },
    hospital_name: { type: String, required: true },
    phone: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

doctorSchema.pre<DoctorTypes>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

doctorSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<DoctorTypes>("Doctor", doctorSchema);
