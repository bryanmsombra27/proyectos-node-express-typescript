import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/ProductController";
import { body, check, validationResult } from "express-validator";
import { validarCampos } from "../middleware/expressValidator";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post(
  "/",
  [
    body("name")
      .notEmpty()
      .withMessage("El nombre del producto no puede ir vacio"),

    body("price")
      .isNumeric()
      .withMessage("debe ser un numero ")
      .custom((value) => value > 0)
      .withMessage("Precio no valido")
      .notEmpty()
      .withMessage("El precio del producto no puede ir vacio"),
    validarCampos,
  ],
  createProduct
);
router.put(
  "/:id",
  [
    body("name")
      .notEmpty()
      .withMessage("El nombre del producto no puede ir vacio"),

    body("price")
      .isNumeric()
      .withMessage("debe ser un numero ")
      .custom((value) => value > 0)
      .withMessage("Precio no valido")
      .notEmpty()
      .withMessage("El precio del producto no puede ir vacio"),
    validarCampos,
  ],
  updateProduct
);
router.delete("/:id", deleteProduct);

export default router;
