import { Document } from "mongoose";

interface ImageTypes extends Document {
  doctor_id: number;
  patient_id: number;
  patient_name: string;
  doctor_name: string;
  img: string;
}

export default ImageTypes;
