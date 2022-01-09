import jwt from "jsonwebtoken";

import { DoctorTypes } from "../models/Doctor";
import { PatientTypes } from "../models/Patient";
import { SECRET_KEY } from "../config";

const generateToken = (user: DoctorTypes | PatientTypes) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      reg_num: user.reg_num,
    },
    SECRET_KEY!,
    { expiresIn: "1h" }
  );
};

export default generateToken;
