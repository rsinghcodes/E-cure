import { Schema, Document, model } from "mongoose";

interface ImageTypes extends Document {
  doctor_id: number;
  patient_id: number;
  patient_name: string;
  doctor_name: string;
  img: string;
}

const imageSchema = new Schema({
  doctor_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  patient_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  patient_name: {
    type: String,
    required: true,
  },
  doctor_name: {
    type: String,
    required: true,
  },
  img: {
    data: Buffer,
    contentType: String,
  },
});

export default model<ImageTypes>("Image", imageSchema);
