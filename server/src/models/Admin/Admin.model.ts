import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

import { AdminTypes } from "./Admin.interface";

const adminSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

adminSchema.pre<AdminTypes>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

adminSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

export default model<AdminTypes>("Admin", adminSchema);
