import { Auth } from "./../model/authModel";
import { Request, Response } from "express";
import { Task } from "../model/taskModel";

exports.getTasks = async (req: Request, res: Response) => {
  try {
    const getResponse = await Task.find();
    res.status(200).json(getResponse);
  } catch (error: any) {
    res.status(404).json({
      message: "Tasks not found",
      error: error.message,
    });
  }
};

exports.postCreateTask = async (req: Request, res: Response) => {
  try {
    const createTask = await Task.create(req.body);
    res.status(200).json({
      message: "Created task",
      createTask,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot create task",
      error: error.message,
    });
  }
};

exports.putUpdateTask = async (req: Request, res: Response) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.tid, req.body);
    res.status(200).json({
      message: "Updated task",
      updateTask,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot update task",
      error: error.message,
    });
  }
};

exports.delTask = async (req: Request, res: Response) => {
  try {
    const deleteTask = await Task.findByIdAndDelete(req.params.tid, req.body);
    res.status(200).json({
      message: "Deleted task",
      deleteTask,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Cannot delete task",
      error: error.message,
    });
  }
};

exports.postFilterTasks = async (req: Request, res: Response) => {
  try {
    const filterValue = await req.body.filterValue;
    const isValidValue = await Task.exists({ task: filterValue });
    if (isValidValue) {
      const filteredData = await Task.find({ task: filterValue });
      res.status(200).json({ message: "Valid filter value", filteredData });
    } else {
      res.status(400).json({ message: "Invalid filter value" });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};
