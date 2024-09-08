import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";
import { body, param } from "express-validator";
import { validarCampos } from "../middlewares/expressValidator";
import { TaskController } from "../controllers/TaskController";
import { hasAuth, projectExists } from "../middlewares/Project";
import { authenticate } from "../middlewares/auth";
import { TeamController } from "../controllers/TeamController";
import { NoteController } from "../controllers/NoteController";

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
  authenticate,
  hasAuth,
  TaskController.createTask
);
router.get(
  "/:projectId/tasks",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  authenticate,
  TaskController.getProjectTasks
);
router.get(
  "/:projectId/tasks/:taskId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  authenticate,
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
  authenticate,
  hasAuth,
  TaskController.uptadeProjectTask
);

router.delete(
  "/:projectId/tasks/:taskId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),

    validarCampos,
  ],
  authenticate,
  hasAuth,
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
  authenticate,
  TaskController.updateProjectTaskStatus
);

// TEAM  ROUTES
router.post(
  "/:projectId/team/find",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    body("email")
      .notEmpty()
      .withMessage("El campo es obligatorio")
      .isEmail()
      .withMessage("Debe ser un email valido"),
    validarCampos,
  ],
  TeamController.findMemberByEmail
);
router.post(
  "/:projectId/team",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    body("id")
      .notEmpty()
      .withMessage("El campo es obligatorio")
      .isMongoId()
      .withMessage("Debe ser un id valido"),
    validarCampos,
  ],
  TeamController.addMemberById
);
router.delete(
  "/:projectId/team/:id",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("id")
      .notEmpty()
      .withMessage("El campo es obligatorio")
      .isMongoId()
      .withMessage("Debe ser un id valido"),
    validarCampos,
  ],
  TeamController.deleteMemberById
);
router.get(
  "/:projectId/team",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    validarCampos,
  ],
  TeamController.getTeamMembers
);

// ROUTES FOR NOTES
router.post(
  "/:projectId/tasks/:taskId/notes",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),
    body("content").notEmpty().withMessage("El contenido es obligatorio"),
    validarCampos,
  ],
  authenticate,
  NoteController.createNote
);
router.get(
  "/:projectId/tasks/:taskId/notes",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),
    body("content").notEmpty().withMessage("El contenido es obligatorio"),
    validarCampos,
  ],
  authenticate,
  NoteController.getTaskNotes
);
router.delete(
  "/:projectId/tasks/:taskId/notes/:noteId",
  [
    param("projectId").isMongoId().withMessage("Debe ser un id valido"),
    param("taskId").isMongoId().withMessage("Debe ser un id valido"),
    param("noteId").isMongoId().withMessage("Debe ser un id valido"),
    validarCampos,
  ],
  authenticate,
  NoteController.deleteNote
);

export default router;
