import { Request, Response, Router } from 'express';

import token from '../middleware/token';
import Doctor from '../models/Doctor/Doctor.model';
import { validateLoginInput } from '../validation/validators';

const router = Router();

router.post(
  '/login',
  async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const { email, password } = req.body;

      const user = await Doctor.findOne({ email });

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

export default router;
