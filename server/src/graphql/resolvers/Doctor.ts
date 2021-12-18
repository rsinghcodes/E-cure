import { UserInputError } from "apollo-server";
import bcrypt from "bcryptjs";

import Doctor, { DoctorTypes } from "../../models/Doctor";
import { ValidateDoctorRegisterInput } from "../../validation/validators";

export default {
  Query: {
    getDoctors: async () => {
      try {
        const doctors = await Doctor.find().sort({ createdAt: -1 });
        return doctors;
      } catch (err: any) {
        throw new Error(err);
      }
    },
    getSpecialization: async (
      _: null,
      { specialization }: { specialization: string }
    ) => {
      try {
        const doctors = await Doctor.find({ specialization });
        return doctors;
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    registerDoctor: async (
      _: null,
      {
        doctorRegisterInput: {
          fullname,
          email,
          password,
          confirmPassword,
          reg_num,
          specialization,
          hospital_name,
          phone,
          age,
          gender,
          address,
        },
      }: { doctorRegisterInput: DoctorTypes }
    ) => {
      const { isValid, errors } = ValidateDoctorRegisterInput(
        fullname,
        email,
        password,
        confirmPassword,
        reg_num,
        specialization,
        hospital_name,
        phone,
        age,
        gender,
        address
      );
      if (!isValid) {
        throw new UserInputError("Errors", { errors });
      }

      // Make sure doctor email doesn't already exist
      const doctorEmail = await Doctor.findOne({ email });
      if (doctorEmail) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This Email is taken",
          },
        });
      }

      // hash password
      password = await bcrypt.hash(password, 12);

      const newDoctor = new Doctor({
        fullname,
        email,
        password,
        reg_num,
        specialization,
        hospital_name,
        phone,
        age,
        gender,
        address,
      });

      const res = await newDoctor.save();

      return {
        ...res,
        id: res._id,
      };
    },

    deleteDoctor: async (_: null, { doctorId }: { doctorId: number }) => {
      const doctor = await Doctor.findById(doctorId);
      try {
        if (doctor) {
          await doctor.delete();
          return "Doctor data deleted successfully";
        } else {
          throw new Error("Doctor not found");
        }
      } catch (err: any) {
        throw new Error(err);
      }
    },
  },
};
