import { Document } from "mongoose";

interface DoctorTypes extends Document {
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
  updatedAt: string;

  isValidPassword(password: string): Promise<Error | boolean>;
}

export default DoctorTypes;
