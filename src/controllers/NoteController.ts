import { Request, Response } from "express";
import Note from "../models/Note";
import Task from "../models/Task";

export class NoteController {
  static createNote = async (req: Request, res: Response) => {
    try {
      const note = await Note.create({
        content: req.body.content,
        createdBy: req.user._id,
        task: req.params.taskId,
      });

      const task = await Task.findById(req.params.taskId);

      task.notes.push(note.id);
      await task.save();

      return res.status(201).send({
        status: "success",
        message: "Nota creada con exito!",
        note,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static getTaskNotes = async (req: Request, res: Response) => {
    try {
      const notes = await Note.find({
        task: req.params.taskId,
      });

      return res.status(201).send({
        status: "success",
        message: "Notas del proyecto!",
        notes,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "error",
        message: error.message,
      });
    }
  };
  static deleteNote = async (req: Request, res: Response) => {
    try {
      const { noteId } = req.params;

      await Note.findByIdAndDelete(noteId);
      const task = await Task.findById(req.params.taskId);
      task.notes = task.notes.filter(
        (note) => note._id.toString() !== noteId.toString()
      );
      await task.save();

      return res.status(201).send({
        status: "success",
        message: "Nota Eliminada con Exito!",
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
