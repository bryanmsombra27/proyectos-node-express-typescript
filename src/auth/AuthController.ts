import { Request, Response } from "express";
import User from "../models/User";
import { passwordHashed, passwordVerify } from "../helpers/PasswordHashed";
import { tokenSixDigits } from "../helpers/Token";
import Token from "../models/Token";
import transporter from "../config/transport";
import { AuthEmail } from "../emails/authEmail";

export class Auth {
  static login = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });

      if (!user) {
        const error = new Error("No se encontro el usuario");

        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }
      if (!user.confirmed) {
        const token = tokenSixDigits();

        await Token.create({
          user: user._id,
          token,
        });

        AuthEmail.sendConfirmationEmail({
          email: user.email,
          name: user.name,
          token,
        });

        const error = new Error(
          "Debes confirmar la cuenta antes de acceder, se te ha enviado un enlace para confirmar tu cuenta a tu correo"
        );

        return res.status(401).send({
          status: "error",
          message: error.message,
        });
      }
      const verifyPass = await passwordVerify(req.body.password, user.password);

      if (!verifyPass) {
        const error = new Error("La contraseña es invalida");

        return res.status(400).send({
          status: "error",
          message: error.message,
        });
      }

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
      // GENERAR TOKEN DE CONFIRMACION DE CUENTA
      const token = tokenSixDigits();

      const userCreated = await User.create({
        ...req.body,
        password: hashPassword,
      });

      await Token.create({
        token,
        user: userCreated._id,
      });

      AuthEmail.sendConfirmationEmail({
        email: userCreated.email,
        name: userCreated.name,
        token,
      });

      return res.status(201).send({
        status: "success",
        message:
          "¡Cuenta creada con exito!, ¡Revisa tu Email para confirmarla!",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static confirmAccount = async (req: Request, res: Response) => {
    try {
      const token = await Token.findOne({
        token: req.body.token,
      });

      if (!token) {
        const error = new Error("El token ya fue confirmado o ya expiro");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      const user = await User.findOne({
        _id: token.user,
      });

      user.confirmed = true;
      await user.save();
      await token.deleteOne();

      return res.status(200).send({
        status: "success",
        message: "¡Cuenta confirmada con exito!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static requestConfirmationCode = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        const error = new Error("El usuario no esta registrado");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }
      if (user.confirmed) {
        const error = new Error("El usuario ya esta registrado");
        return res.status(403).send({
          status: "error",
          message: error.message,
        });
      }

      // GENERAR TOKEN DE CONFIRMACION DE CUENTA
      const token = tokenSixDigits();

      await Token.create({
        token,
        user: user._id,
      });

      AuthEmail.sendConfirmationEmail({
        email: user.email,
        name: user.name,
        token,
      });

      return res.status(201).send({
        status: "success",
        message: "¡Token generado con exito!, ¡Revisa tu Email para confirmar!",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static forgotPassword = async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        email: req.body.email,
      });
      if (!user) {
        const error = new Error("El usuario no esta registrado");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      // GENERAR TOKEN DE CONFIRMACION DE CUENTA
      const token = tokenSixDigits();

      await Token.create({
        token,
        user: user._id,
      });

      AuthEmail.sendPasswordResetToken({
        email: user.email,
        name: user.name,
        token,
      });

      return res.status(201).send({
        status: "success",
        message: "Revisa tu email para instrucciones",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };

  static validateToken = async (req: Request, res: Response) => {
    try {
      const token = await Token.findOne({
        token: req.body.token,
      });

      if (!token) {
        const error = new Error("El token ya fue confirmado o ya expiro");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      const user = await User.findOne({
        _id: token.user,
      });

      return res.status(200).send({
        status: "success",
        message: "¡Cuenta confirmada con exito!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static updatePasswordWithToken = async (req: Request, res: Response) => {
    try {
      const token = await Token.findOne({
        token: req.params.token,
      });

      if (!token) {
        const error = new Error("El token ya fue confirmado o ya expiro");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      const user = await User.findOne({
        _id: token.user,
      });
      const newHashPassword = await passwordHashed(req.body.password);

      user.password = newHashPassword;
      await token.deleteOne();
      await user.save();

      return res.status(200).send({
        status: "success",
        message: "¡Contraseña actualizada con exito!",
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
