import { NextFunction, Request, Response, Router } from "express";
import uniqueRandom from "unique-random";

import token from "../middleware/token";
import Patient from "../models/Patient/Patient.model";
import { ValidatePatientRegisterInput } from "../validation/validators";

const router = Router();

router.post(
  "/register",
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
        return res.status(400).json({ email: "Email already exists" });
      }

      const random = uniqueRandom(10000, 100000);
      const { fullname, email, password, phone, age, gender } = req.body;

      const user = await Patient.create({
        fullname,
        email,
        password,
        phone,
        age,
        gender,
        reg_num: random(),
      });

      const accessToken = token.createToken(user);

      res.status(201).json({ accessToken });
    } catch (error: any) {
      next(new Error(error));
    }
  }
);

router.post(
  "/login",
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
          .json({ email: "Unable to find user with that email address" });
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user);

        res.status(200).json({ accessToken });
      } else {
        res.status(400).json({ password: "Wrong credentials given" });
      }
    } catch (error: any) {
      next(new Error(error));
    }
  }
);

export default router;
