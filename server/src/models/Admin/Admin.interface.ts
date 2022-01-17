import { Document } from "mongoose";

export interface AdminTypes extends Document {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}
