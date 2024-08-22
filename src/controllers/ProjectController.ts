import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  static getAllProjects = async (req: Request, res: Response) => {
    try {
      const projects = await Project.find();

      return res.status(200).send({
        status: "success",
        projects,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en la peticion",
      });
    }
  };
  static getOneProject = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.params.id).populate("tasks");

      if (!project) {
        const error = new Error("No se encontro proyecto");

        return res.status(400).send({
          status: "error",
          message: error.message,
        });
      }

      return res.status(200).send({
        status: "success",
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };

  static createProjects = async (req: Request, res: Response) => {
    try {
      const project = await Project.create(req.body);

      return res.status(201).send({
        status: "success",
        message: "Proyecto creado con exito!",
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static updateProject = async (req: Request, res: Response) => {
    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
        },
        {
          new: true,
        }
      );

      if (!project) {
        const error = new Error("No se encontro proyecto");

        return res.status(400).send({
          status: "error",
          message: error.message,
        });
      }

      return res.status(200).send({
        status: "success",
        project,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: "Error en el servidor",
      });
    }
  };
  static deleteProject = async (req: Request, res: Response) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        const error = new Error("No se encontro proyecto");

        return res.status(400).send({
          status: "error",
          message: error.message,
        });
      }

      await project.deleteOne();

      return res.status(200).send({
        status: "success",
        message: "Proyecto eliminado con exito!",
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
