import { Request, Response, Router } from 'express';

import Doctor from '../models/Doctor/Doctor.model';
import Patient from '../models/Patient/Patient.model';

const router = Router();

router.get(
  '/get-doctors',
  async (req: Request, res: Response): Promise<Response | void> => {
    const doctors = await Doctor.find().select('-password').exec();
    res.status(200).send({ doctors });
  }
);

router.get(
  '/get-patients',
  async (req: Request, res: Response): Promise<Response | void> => {
    const patients = await Patient.find().select('-password').exec();
    res.status(200).send({ patients });
  }
);

export default router;
