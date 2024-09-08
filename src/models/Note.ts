import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";

export interface NoteType extends Document {
  content: string;
  createdBy: Types.ObjectId;
  task: Types.ObjectId;
}

const NoteSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: Types.ObjectId,
      ref: "Task",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model<NoteType>("Note", NoteSchema);

export default Note;
