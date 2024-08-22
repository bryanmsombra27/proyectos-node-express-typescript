import mongoose, { Schema, Document, Types } from "mongoose";

const taskStatus = {
  PENDING: "pending",
  ON_HOLD: "onHold",
  IN_PROGESS: "inProgress",
  UNDER_REVIEW: "underReview",
  COMPLETED: "completed ",
} as const;

export type TaskStatus = (typeof taskStatus)[keyof typeof taskStatus];

export interface TaskType extends Document {
  name: string;
  description: string;
  project: Types.ObjectId;
  status: TaskStatus;
}

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    project: {
      type: Types.ObjectId,
      ref: "Project",
    },
    status: {
      type: String,
      enum: Object.values(taskStatus),
      default: taskStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
