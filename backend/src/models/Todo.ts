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
      minLength: [3, "Minimum Length of title should be three"],
    },
    content: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

type Todo = InferSchemaType<typeof todoSchema>;
export default model<Todo>("todo", todoSchema);
