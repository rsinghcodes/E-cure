import { Document } from "mongoose";

interface PatientTypes extends Document {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  age: string;
  gender: string;
  createdAt: string;
  updatedAt: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export default PatientTypes;
