import jwt from "jsonwebtoken";

import Token from "./token.interface";
import { SECRET_KEY } from "../config";
import AdminTypes from "../models/Admin/Admin.interface";
import DoctorTypes from "../models/Doctor/Doctor.interface";
import PatientTypes from "../models/Patient/Patient.interface";

export const createToken = (
  user: AdminTypes | DoctorTypes | PatientTypes
): string => {
  return jwt.sign({ id: user._id }, SECRET_KEY as jwt.Secret, {
    expiresIn: "1d",
  });
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, payload) => {
      if (err) return reject(err);

      resolve(payload as Token);
    });
  });
};

export default { createToken, verifyToken };
