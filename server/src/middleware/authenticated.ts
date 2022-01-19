import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin/Admin.model";
import Doctor from "../models/Doctor/Doctor.model";
import Patient from "../models/Patient/Patient.model";

import token from "./token";
import Token from "./token.interface";

async function authenticatedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const bearer = req.headers.authorization;

  if (!bearer || !bearer.startsWith("Bearer ")) {
    return next(new Error("Unauthorised"));
  }

  const accessToken = bearer.split("Bearer ")[1].trim();
  try {
    const payload: Token | jwt.JsonWebTokenError = await token.verifyToken(
      accessToken
    );

    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new Error("Unauthorised"));
    }

    const user =
      (await Admin.findById(payload.id).select("-password").exec()) ||
      (await Doctor.findById(payload.id).select("-password").exec()) ||
      (await Patient.findById(payload.id).select("-password").exec());

    if (!user) {
      return next(new Error("Unauthorised"));
    }

    req.user = user;

    return next();
  } catch (error) {
    return next(new Error("Unauthorised"));
  }
}

export default authenticatedMiddleware;
