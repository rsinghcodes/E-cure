import { Document } from "mongoose";

interface AppointmentTypes extends Document {
  patient_name: string;
  doctor_name: string;
  status: number;
  specialization: string;
  day: string;
  ailment: string;
}

export default AppointmentTypes;
