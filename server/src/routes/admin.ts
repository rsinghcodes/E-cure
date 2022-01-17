import { NextFunction, Request, Response, Router } from "express";
import Admin from "../models/Admin/Admin.model";
import createToken from "../middleware/createToken";
import { ValidateAdminRegisterInput } from "../validation/validators";

const router = Router();

router.post(
  "/register",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { errors, isValid } = ValidateAdminRegisterInput(req.body);
      if (!isValid) {
        return res.status(400).json(errors);
      }

      const admin = await Admin.findOne({ email: req.body.email });

      if (admin) {
        return res.status(400).json({ email: "Email already exists" });
      }

      const { fullname, email, password } = req.body;

      const user = await Admin.create({
        fullname,
        email,
        password,
        role: "admin",
      });

      const accessToken = createToken(user);

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

      const user = await Admin.findOne({ email });

      if (!user) {
        throw new Error("Unable to find user with that email address");
      }

      if (await user.isValidPassword(password)) {
        const accessToken = createToken(user);

        res.status(200).json({ accessToken });
      } else {
        throw new Error("Wrong credentials given");
      }
    } catch (error: any) {
      next(new Error(error));
    }
  }
);

router.post(
  "/register-doctor",
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {}
);

export default router;
