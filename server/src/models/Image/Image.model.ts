import { Schema, model } from "mongoose";
import ImageTypes from "./Image.interface";

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
