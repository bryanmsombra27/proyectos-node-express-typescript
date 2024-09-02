import { Router } from "express";
import { Auth } from "../auth/AuthController";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/expressValidator";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.post(
  "/create-account",
  [
    body("name").notEmpty().withMessage("El campo es requerido"),
    body("email")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isEmail()
      .withMessage("Debe ser un email valido"),
    body("password")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isLength({
        min: 6,
      })
      .withMessage("La contraseña debe tener minimo 6 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Los passwords no son iguales");
      }
      return true;
    }),
    validarCampos,
  ],
  Auth.createAccount
);
router.post(
  "/",
  [
    body("email")
      .notEmpty()
      .withMessage("El email es requerido")
      .isEmail()
      .withMessage("Debe ser un email valido"),
    body("password").notEmpty().withMessage("El campo es requerido"),
    validarCampos,
  ],
  Auth.login
);
router.post(
  "/confirm-account",
  [
    body("token").notEmpty().withMessage("El campo no puede ir vacio"),
    validarCampos,
  ],
  Auth.confirmAccount
);

router.post(
  "/request-code",
  [
    body("email")
      .notEmpty()
      .withMessage("El campo no puede ir vacio")
      .isEmail()
      .withMessage("Debe ser un email valido"),
    validarCampos,
  ],
  Auth.requestConfirmationCode
);
router.post(
  "/forgot-password",
  [
    body("email")
      .notEmpty()
      .withMessage("El campo no puede ir vacio")
      .isEmail()
      .withMessage("Debe ser un email valido"),
    validarCampos,
  ],
  Auth.forgotPassword
);
router.post(
  "/validate-token",
  [
    body("token").notEmpty().withMessage("El campo no puede ir vacio"),
    validarCampos,
  ],
  Auth.validateToken
);
router.post(
  "/update-password/:token",
  [
    param("token").notEmpty().withMessage("el token es requerido"),
    body("password")
      .notEmpty()
      .withMessage("El campo es requerido")
      .isLength({
        min: 6,
      })
      .withMessage("La contraseña debe tener minimo 6 caracteres"),
    body("password_confirmation").custom((value, { req }) => {
      if (req.body.password !== value) {
        throw new Error("Los passwords no son iguales");
      }
      return true;
    }),

    validarCampos,
  ],
  Auth.updatePasswordWithToken
);
router.get("/user", authenticate, Auth.user);

export default router;
