import { NextFunction, Request, Response, Router } from 'express';

import authenticatedMiddleware from '../middleware/authenticated';

import token from '../middleware/token';
import Appointment from '../models/Appointment/Appointment.model';
import Patient from '../models/Patient/Patient.model';
import { ValidatePatientRegisterInput } from '../validation/validators';

const router = Router();

router.post(
  '/register',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { errors, isValid } = ValidatePatientRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const patient = await Patient.findOne({ email: req.body.email });

      if (patient) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      const { fullname, email, password, phone, age, gender, reg_num } =
        req.body;

      const user = await Patient.create({
        fullname,
        email,
        password,
        phone,
        age,
        gender,
        reg_num,
      });

      const accessToken = token.createToken(user);

      res.status(201).json({ accessToken });
    } catch (error: any) {
      next(new Error(error));
    }
  }
);

router.post(
  '/login',
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const user = await Patient.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ email: 'Unable to find user with that email address' });
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user);

        res.status(200).json({ accessToken });
      } else {
        res.status(400).json({ password: 'Wrong credentials given' });
      }
    } catch (error: any) {
      next(new Error(error));
    }
  }
);

router.get(
  '/getAllAppointment',
  authenticatedMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    let patientId = req.user.id;
    Appointment.find({ patient_id: patientId })
      .then((data) => {
        return res.json({ appointment: data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
);

export default router;
