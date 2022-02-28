import { Request, Response, Router } from 'express';

import authenticatedMiddleware from '../middleware/authenticated';

import token from '../middleware/token';
import Appointment from '../models/Appointment/Appointment.model';
import Patient from '../models/Patient/Patient.model';
import {
  validateLoginInput,
  ValidatePatientRegisterInput,
} from '../validation/validators';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response): Promise<Response | void> => {
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

      res.status(200).json({ accessToken });
    } catch (error: any) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
);

router.post(
  '/login',
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

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
        res.status(400).json({ password: 'Password is Incorrect' });
      }
    } catch (error: any) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
);

router.get(
  '/getAllAppointments',
  authenticatedMiddleware,
  (req: Request, res: Response) => {
    try {
      const appointments = Appointment.find({ patient_id: req.user.id });

      if (!appointments) {
        return res.status(404).json({
          error: 'No appointments found!',
        });
      }

      return res.status(200).json({
        appointments,
      });
    } catch (error: any) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
);

export default router;
