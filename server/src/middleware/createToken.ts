import { SECRET_KEY } from "../config";
import jwt from "jsonwebtoken";
import { AdminTypes } from "../models/Admin/Admin.interface";
import { DoctorTypes } from "../models/Doctor/Doctor.interface";
import { PatientTypes } from "../models/Patient/Patient.interface";

export const createToken = (
  user: AdminTypes | DoctorTypes | PatientTypes
): string => {
  return jwt.sign(
    { id: user._id, fullname: user.fullname, email: user.email },
    SECRET_KEY as jwt.Secret,
    {
      expiresIn: "1d",
    }
  );
};

export default createToken;
