import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      const { project } = req;

      const task = new Task({
        ...req.body,
        project: project.id,
      });
      project.tasks.push(task.id);
      await Promise.allSettled([task.save(), project.save()]);

      return res.status(201).send({
        status: "success",
        message: "Tarea creada con exito!",
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static getProjectTasks = async (req: Request, res: Response) => {
    try {
      const { project } = req;

      const tasks = await Task.find({
        project: project.id,
      }).populate("project");

      return res.status(201).send({
        status: "success",
        message: "Tarea creada con exito!",
        tasks,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static getProjectTaskById = async (req: Request, res: Response) => {
    try {
      const { project } = req;
      const { taskId } = req.params;

      const task = await Task.findOne({
        project: project.id,
        id: taskId,
      }).populate("project");

      if (!task) {
        const error = new Error("No se encontro tarea");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      return res.status(201).send({
        status: "success",
        message: "Tarea recuperada con exito!",
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static uptadeProjectTask = async (req: Request, res: Response) => {
    try {
      const { project } = req;
      const { taskId } = req.params;

      const task = await Task.findOneAndUpdate(
        {
          project: project.id,
          id: taskId,
        },
        { ...req.body },
        { new: true }
      );

      if (!task) {
        const error = new Error("No se encontro tarea");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      return res.status(201).send({
        status: "success",
        message: "Tarea actualizada con exito!",
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static deleteProjectTask = async (req: Request, res: Response) => {
    try {
      const { project } = req;
      const { taskId } = req.params;

      const task = await Task.findOneAndDelete({
        project: project.id,
        id: taskId,
      });
      if (!task) {
        const error = new Error("No se encontro tarea");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      project.tasks = project.tasks.filter(
        (projectTask) => projectTask.toString() !== task.id.toString()
      );
      await project.save();

      return res.status(201).send({
        status: "success",
        message: "Tarea eliminada con exito!",
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static updateProjectTaskStatus = async (req: Request, res: Response) => {
    try {
      const { project } = req;
      const { taskId } = req.params;

      const task = await Task.findOneAndUpdate(
        {
          project: project.id,
          id: taskId,
        },
        {
          status: req.body.status,
        },
        {
          new: true,
        }
      );
      if (!task) {
        const error = new Error("No se encontro tarea");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      project.tasks = project.tasks.filter(
        (projectTask) => projectTask.toString() !== task.id.toString()
      );
      await project.save();

      return res.status(201).send({
        status: "success",
        message: "Estatus actualizado con exito!",
        task,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
}
