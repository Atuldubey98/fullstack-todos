import { model, Schema } from "mongoose";
import ITodo from "../interfaces/ITodo";

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    complete: {
      type: Schema.Types.Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
      index: "text",
      minLength: [3, "Minimum Length of title should be three"],
    },
    content: {
      type: String,
      index: "text",
    },
  },
  { timestamps: true, versionKey: false }
);
todoSchema.index({ title: "text", content: "text" });
const todoModel = model<ITodo>("todo", todoSchema);

export default todoModel;
