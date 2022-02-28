import Validator from 'validator';
import isEmpty from 'is-empty';

import DoctorTypes from '../models/Doctor/Doctor.interface';
import PatientTypes from '../models/Patient/Patient.interface';
import AdminTypes from '../models/Admin/Admin.interface';

export const validateLoginInput = (
  data: DoctorTypes | PatientTypes | AdminTypes
) => {
  let errors = <DoctorTypes | PatientTypes | AdminTypes>{};
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const ValidateDoctorRegisterInput = (data: DoctorTypes) => {
  const errors = <DoctorTypes>{};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';
  data.reg_num = !isEmpty(data.reg_num) ? data.reg_num : '';
  data.specialization = !isEmpty(data.specialization)
    ? data.specialization
    : '';
  data.hospital_name = !isEmpty(data.hospital_name) ? data.hospital_name : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.age = !isEmpty(data.age) ? data.age : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.address = !isEmpty(data.address) ? data.address : '';

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Name field is required';
  }
  if (Validator.isEmpty(data.address)) {
    errors.address = 'Address field is required';
  }
  if (Validator.isEmpty(data.specialization)) {
    errors.specialization = 'Specialization field is required';
  }
  if (Validator.isEmpty(data.reg_num)) {
    errors.reg_num = 'Registration Number field is required';
  }
  if (Validator.isEmpty(data.hospital_name)) {
    errors.hospital_name = 'Hospital Name field is required';
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Contact Number field is required';
  } else if (!Validator.isMobilePhone(data.phone, ['en-IN'])) {
    errors.phone = 'Contact Number is invalid';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const ValidatePatientRegisterInput = (data: PatientTypes) => {
  const errors = <PatientTypes>{};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';
  data.age = !isEmpty(data.age) ? data.age : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Name field is required';
  }
  if (Validator.isEmpty(data.phone)) {
    errors.phone = 'Contact Number field is required';
  } else if (!Validator.isMobilePhone(data.phone, ['en-IN'])) {
    errors.phone = 'Please enter valid phone number';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (Validator.isEmpty(data.age)) {
    errors.age = 'Age field is required';
  }
  if (Validator.isEmpty(data.gender)) {
    errors.gender = 'Gender field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const ValidateAdminRegisterInput = (data: AdminTypes) => {
  const errors = <AdminTypes>{};
  data.fullname = !isEmpty(data.fullname) ? data.fullname : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : '';

  if (Validator.isEmpty(data.fullname)) {
    errors.fullname = 'Name field is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  } else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Confirm password field is required';
  }
  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
