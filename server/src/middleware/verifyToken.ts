import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { SECRET_KEY } from "../config";

interface Token extends Object {
  id: Schema.Types.ObjectId;
  expiresIn: number;
}

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith("Bearer ")) {
      return next(new Error("Unauthorised"));
    }

    const accessToken = bearer.split("Bearer ")[1].trim();

    try {
      if (!accessToken)
        return res
          .status(403)
          .send({ auth: false, message: "No token provided." });
      jwt.verify(accessToken, SECRET_KEY as jwt.Secret, (err, payload) => {
        if (err)
          return res
            .status(500)
            .send({ auth: false, message: "Failed to authenticate token." });

        userId = payload.id;
        req.userId = userId;
        next();
      });
    } catch (error) {
      return next(new Error("Unauthorised"));
    }
  });
};

export default verifyToken;
