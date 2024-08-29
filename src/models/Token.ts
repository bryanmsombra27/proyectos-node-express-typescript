import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";

export interface TokenType extends Document {
  token: string;
  user: Types.ObjectId;
  createdAt: Date;
}

const TokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now(),
      expires: "1d",
    },
  },
  {
    timestamps: true,
  }
);

const Token = mongoose.model<TokenType>("Token", TokenSchema);

export default Token;
