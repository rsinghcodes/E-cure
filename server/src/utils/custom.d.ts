import AdminTypes from "../models/Admin/Admin.interface";
import DoctorTypes from "../models/Doctor/Doctor.interface";
import PatientTypes from "../models/Patient/Patient.interface";

declare global {
  namespace Express {
    export interface Request {
      user: AdminTypes | DoctorTypes | PatientTypes;
    }
  }
}
