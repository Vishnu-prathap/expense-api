import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";
export interface TaskModel {
  tid: string;
  uid: string;
  name: string;
  description: string;
  startDate: Date;
  task: string;
  endDate: Date;
  type: string;
}

const TaskSchema = new Schema<TaskModel>(
  {
    tid: { type: "String", default: uuidv4 },
    name: { type: "String", required: true },
    uid: { type: "String", required: true },
    description: { type: "String", required: true },
    task: {
      type: "String",
      required: true,
      enum: [
        "Groceries",
        "Leisure",
        "Electronics",
        "Utilities",
        "Clothing",
        "Health",
        "Others",
      ],
    },
    startDate: { type: "Date", required: true },
    endDate: { type: "Date", required: true },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);
