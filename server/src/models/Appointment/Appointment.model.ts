import { Schema, model } from "mongoose";

import AppointmentTypes from "./Appointment.interface";

const appointmentSchema = new Schema({
  doctor_id: { type: Schema.Types.ObjectId, required: true },
  patient_id: { type: Schema.Types.ObjectId, required: true },
  patient_name: { type: String, required: true },
  doctor_name: { type: String, required: true },
  status: { type: Number, default: 0 },
  specialization: { type: String, required: true },
  day: { type: String, required: true },
  ailment: { type: String, required: true },
});

export default model<AppointmentTypes>("Appointment", appointmentSchema);
