import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { TaskType } from "./Task";
import { UserType } from "./User";

export interface ProjectType extends Document {
  projectName: string;
  clientName: string;
  description: string;
  tasks: PopulatedDoc<TaskType>[];
  manager: PopulatedDoc<UserType>;
  team: PopulatedDoc<UserType>[];
}

const ProjectSchema = new Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    tasks: [
      {
        type: Types.ObjectId,
        ref: "Task",
      },
    ],
    manager: {
      type: Types.ObjectId,
      ref: "User",
    },
    team: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);

export default Project;
