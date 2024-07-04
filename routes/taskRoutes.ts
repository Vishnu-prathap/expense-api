import express from "express";

const {
  getTasks,
  postCreateTask,
  putUpdateTask,
  delTask,
  postFilterTasks,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", getTasks);
router.post("/", postCreateTask);
router.put("/:id", putUpdateTask);
router.delete("/:id", delTask);
router.post("/filter", postFilterTasks);
export { router as task };
