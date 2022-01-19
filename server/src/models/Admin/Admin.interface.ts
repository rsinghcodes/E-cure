import { Document } from "mongoose";

interface AdminTypes extends Document {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export default AdminTypes;
