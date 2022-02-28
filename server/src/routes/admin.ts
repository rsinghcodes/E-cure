import { Request, Response, Router } from 'express';

import token from '../middleware/token';
import Admin from '../models/Admin/Admin.model';
import Doctor from '../models/Doctor/Doctor.model';
import {
  ValidateAdminRegisterInput,
  ValidateDoctorRegisterInput,
  validateLoginInput,
} from '../validation/validators';

const router = Router();

router.post(
  '/register',
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { errors, isValid } = ValidateAdminRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const admin = await Admin.findOne({ email: req.body.email });

      if (admin) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      const { fullname, email, password } = req.body;

      const user = await Admin.create({
        fullname,
        email,
        password,
        role: 'admin',
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

      const user = await Admin.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ email: 'Unable to find user with that email address' });
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user);
        res.status(200).json({ accessToken });
      } else {
        res.status(400).json({ password: 'Password is incorrect' });
      }
    } catch (error: any) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
);

router.post(
  '/register-doctor',
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { errors, isValid } = ValidateDoctorRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const doctor = await Doctor.findOne({ email: req.body.email });

      if (doctor) {
        return res.status(400).json({ email: 'Email already exists' });
      }

      const {
        fullname,
        email,
        password,
        specialization,
        hospital_name,
        phone,
        age,
        gender,
        address,
        reg_num,
      } = req.body;

      const user = await Doctor.create({
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

      res.status(201).send({ user });
    } catch (error: any) {
      return res.status(500).json({
        error: 'Server Error',
      });
    }
  }
);

export default router;
