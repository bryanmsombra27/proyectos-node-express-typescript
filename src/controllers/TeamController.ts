import { Request, Response } from "express";
import User from "../models/User";
import Project from "../models/Project";

export class TeamController {
  static findMemberByEmail = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const user = await User.findOne({ email }).select("id email name");

      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      return res.status(200).send({
        status: "success",
        message: "Usuario encontrado!",
        user,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static addMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;

      const user = await User.findById(id).select("id");

      const userAlreadyAdded = req.project.team.find(
        (item) => item._id.toString() == user._id.toString()
      );

      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }

      if (userAlreadyAdded) {
        const error = new Error("Usuario ya fue agregado al proyecto");
        return res.status(409).send({
          status: "error",
          message: error.message,
        });
      }

      req.project.team.push(user.id);
      await req.project.save();

      return res.status(200).send({
        status: "success",
        message: "Usuario agregado al equipo!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static deleteMemberById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const user = await User.findById(id).select("id");

      if (!user) {
        const error = new Error("Usuario no encontrado");
        return res.status(404).send({
          status: "error",
          message: error.message,
        });
      }
      req.project.team = req.project.team.filter(
        (item) => item._id.toString() !== user._id.toString()
      );

      await req.project.save();

      return res.status(200).send({
        status: "success",
        message: "Usuario eliminado del equipo!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static getTeamMembers = async (req: Request, res: Response) => {
    try {
      //   const project = await req.project.populate("team", "id name");
      const project = await Project.findById(req.project._id).populate({
        path: "team",
        select: "id email name",
      });

      return res.status(200).send({
        status: "success",
        message: "Miembros del equipo!",
        members: project.team,
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
