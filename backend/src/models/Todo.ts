import { InferSchemaType, model, Schema } from "mongoose";

const todoSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
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
type Todo = InferSchemaType<typeof todoSchema>;
const todoModel = model<Todo>("todo", todoSchema);
export default todoModel;
