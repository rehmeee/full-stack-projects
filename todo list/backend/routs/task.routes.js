import express from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { addTask, deleteTask, taskStatus } from "../controllers/task.controller.js";

const taskRouter = express.Router();
// add task
taskRouter.route("/add-task").post(verifyUser, addTask)

// task Status
taskRouter.route("/task-status").patch(verifyUser, taskStatus)

// delete task
taskRouter.route("/delete-task").patch(verifyUser, deleteTask)
export default taskRouter