import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/expressValidator";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middlewares/Project";
import { authenticate } from "../middlewares/auth";

const router = Router();
// PROJECTS ROUTES
router.get("/", authenticate, ProjectController.getAllProjects);
router.get(
  "/:id",
  [param("id").isMongoId().withMessage("Debe ser un id valido"), validarCampos],
  authenticate,
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
  authenticate,
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
  authenticate,
  ProjectController.updateProject
);
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Debe ser un id valido"), validarCampos],
  authenticate,
  ProjectController.deleteProject
);
//DETECTA PARA TODAS LAS RUTAS QUE SE MANDE ESE PARAMETRO
router.param("projectId", projectExists);

// TASKS ROUTES
router.post(
  "/:projectId/tasks",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
    body("description").notEmpty().withMessage("La descripcion es obligatoria"),
    validarCampos,
  ],
  TaskController.createTask
);
router.get(
  "/:projectId/tasks",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  TaskController.getProjectTasks
);
router.get(
  "/:projectId/tasks/:taskId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  TaskController.getProjectTaskById
);
router.put(
  "/:projectId/tasks/:taskId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),
    body("name").notEmpty().withMessage("El nombre de la tarea es obligatorio"),
    body("description").notEmpty().withMessage("La descripcion es obligatoria"),
    validarCampos,
  ],
  TaskController.uptadeProjectTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  TaskController.deleteProjectTask
);

router.post(
  "/:projectId/tasks/:taskId/status",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),
    body("status").notEmpty().withMessage("El estado es obligatorio"),
    validarCampos,
  ],
  TaskController.updateProjectTaskStatus
);

export default router;
