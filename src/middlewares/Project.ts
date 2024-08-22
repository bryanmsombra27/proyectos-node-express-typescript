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
