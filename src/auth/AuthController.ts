import { Request, Response } from "express";
import User from "../models/User";
import { passwordHashed } from "../helpers/PasswordHashed";

export class Auth {
  static login = async (req: Request, res: Response) => {
    try {
      return res.status(200).send({
        status: "success",
        message: "Acceso Exitoso!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static createAccount = async (req: Request, res: Response) => {
    try {
      const hashPassword = await passwordHashed(req.body.password);
      const user = await User.findOne({
        email: req.body.email,
      });
      if (user) {
        const error = new Error("El usuario ya fue registrado");
        return res.status(409).send({
          status: "error",
          message: error.message,
        });
      }

      await User.create({
        ...req.body,
        password: hashPassword,
      });

      return res.status(201).send({
        status: "success",
        message:
          "¡Cuenta creada con exito!, ¡Revisa tu Email para confirmarla!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
}
