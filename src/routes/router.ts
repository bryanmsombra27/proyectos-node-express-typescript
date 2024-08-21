import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/expressValidator";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Debe ser un id valido"), validarCampos],
  ProjectController.getOneProject
);
router.post(
  "/",
  [
    body("projectName")
      .notEmpty()
      .withMessage("El nombre de projecto es obligatorio"),
    body("clientName")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio"),
    body("description").notEmpty().withMessage("La descripcion es obligatoria"),
    validarCampos,
  ],
  ProjectController.createProjects
);
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Debe ser un id valido"),
    body("projectName")
      .notEmpty()
      .withMessage("El nombre de projecto es obligatorio"),
    body("clientName")
      .notEmpty()
      .withMessage("El nombre del cliente es obligatorio"),
    body("description").notEmpty().withMessage("La descripcion es obligatoria"),
    validarCampos,
  ],
  ProjectController.updateProject
);
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Debe ser un id valido"), validarCampos],
  ProjectController.deleteProject
);

export default router;
