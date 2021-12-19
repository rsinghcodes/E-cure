import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";

import Patient, { PatientTypes } from "../../models/Patient";
import generateToken from "../../middleware/generateToken";
import {
  ValidatePatientRegisterInput,
  validateLoginInput,
} from "../../validation/validators";

export default {
  Query: {
    getPatients: async () => {
      try {
        const patients = await Patient.find().sort({ createdAt: -1 });
        return patients;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    registerPatient: async (
      _: null,
      {
        patientRegisterInput: {
          fullname,
          email,
          password,
          confirmPassword,
          reg_num,
          phone,
          age,
          gender,
        },
      }: { patientRegisterInput: PatientTypes }
    ) => {
      const { isValid, errors } = ValidatePatientRegisterInput(
        fullname,
        email,
        password,
        confirmPassword,
        reg_num,
        phone,
        age,
        gender
      );
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure patient's email doesn't already exist
      const patientEmail = await Patient.findOne({ email });
      if (patientEmail) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This Email is taken",
          },
        });
      }

      // hash password
      password = await bcrypt.hash(password, 12);

      const newPatient = new Patient({
        fullname,
        email,
        password,
        reg_num,
        phone,
        age,
        gender,
      });

      const res = await newPatient.save();

      const token = generateToken(res);

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    deletePatient: async (_: null, { patientId }: { patientId: number }) => {
      const patient = await Patient.findById(patientId);
      try {
        if (patient) {
          await patient.delete();
          return "Patient data deleted successfully";
        } else {
          throw new Error("Patient not found");
        }
      } catch (err: any) {
        throw new Error(err);
      }
    },

    loginPatient: async (
      _: null,
      { email, password }: { email: string; password: string }
    ) => {
      const { isValid, errors } = validateLoginInput(email, password);
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      const patient = await Patient.findOne({ email });

      if (!patient) {
        errors.email = "Email not found";
        throw new UserInputError("Email not found", { errors });
      }

      const match = await bcrypt.compare(password, patient.password);
      if (!match) {
        errors.password = "Password is invalid!";
        throw new UserInputError("Password is invalid!", {
          errors,
        });
      }

      const token = generateToken(patient);

      return {
        ...patient._doc,
        id: patient._id,
        token,
      };
    },
  },
};
