import { NextFunction, Request, Response } from "express";
import Project, { ProjectType } from "../models/Project";

declare global {
  namespace Express {
    interface Request {
      project: ProjectType;
    }
  }
}

export const projectExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { projectId } = req.params;
    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("No se encontro el proyecto");
      return res.status(404).send({
        status: "error",
        message: error.message,
      });
    }
    req.project = project;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "error en el servidor",
    });
  }
};

export const hasAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.user, "USUARIO");

  if (req.user?._id.toString() !== req.project.manager.toString()) {
    const error = new Error(
      "No tienes autorizacion para eliminar o editar tareas en este proyecto"
    );

    return res.status(403).send({
      status: "error",
      message: error.message,
    });
  }

  next();
};
