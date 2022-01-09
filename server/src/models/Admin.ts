import { Schema, Document, model } from "mongoose";

export interface AdminTypes extends Document {
  _doc: object;
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const adminSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = model<AdminTypes>("Admin", adminSchema);
