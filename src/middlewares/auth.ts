import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { UserType } from "../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : "";
    if (!token) {
      return res.status(403).send({
        status: "error",
        message: "el token no es valido o ya expiro",
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET) as any;

    const user = await User.findById(data.id).select("_id name email");

    if (!user) {
      return res.status(404).send({
        status: "error",
        message: "el token no es valido o ya expiro",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error en el servidor",
    });
  }
};
