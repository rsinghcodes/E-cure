import Validator from "validator";
import isEmpty from "is-empty";
import { DoctorTypes } from "../models/Doctor";

export const ValidateDoctorRegisterInput = (
  fullname: string,
  email: string,
  password: string,
  confirmPassword: string,
  reg_num: string,
  specialization: string,
  hospital_name: string,
  phone: string,
  age: string,
  gender: string,
  address: string
) => {
  const errors = <DoctorTypes>{};
  fullname = !isEmpty(fullname) ? fullname : "";
  email = !isEmpty(email) ? email : "";
  password = !isEmpty(password) ? password : "";
  confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : "";
  reg_num = !isEmpty(reg_num) ? reg_num : "";
  specialization = !isEmpty(specialization) ? specialization : "";
  hospital_name = !isEmpty(hospital_name) ? hospital_name : "";
  phone = !isEmpty(phone) ? phone : "";
  age = !isEmpty(age) ? age : "";
  gender = !isEmpty(gender) ? gender : "";
  address = !isEmpty(address) ? address : "";

  if (Validator.isEmpty(fullname)) {
    errors.fullname = "Name field is required";
  }
  if (Validator.isEmpty(address)) {
    errors.address = "Address field is required";
  }
  if (Validator.isEmpty(specialization)) {
    errors.specialization = "Specialisation field is required";
  }
  if (Validator.isEmpty(reg_num)) {
    errors.reg_num = "Registration Number field is required";
  }
  if (Validator.isEmpty(hospital_name)) {
    errors.hospital_name = "Hospital Name field is required";
  }
  if (Validator.isEmpty(phone)) {
    errors.phone = "Contact Number field is required";
  } else if (!Validator.isMobilePhone(phone, ["en-IN"])) {
    errors.phone = "Contact Number is invalid";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(password, { min: 6, max: 20 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
