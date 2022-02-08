import { NextFunction, Request, Response, Router } from "express";

import token from "../middleware/token";
import Doctor from "../models/Doctor/Doctor.model";

const router = Router();

router.post(
  "/login",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const user = await Doctor.findOne({ email });

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