import express from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { addTask, deleteTask, getTasks, taskStatus } from "../controllers/task.controller.js";

const taskRouter = express.Router();
// add task
taskRouter.route("/add-task").post(verifyUser, addTask)

// fetch all the tasks 
taskRouter.route("/tasks").get(verifyUser, getTasks)

// task Status
taskRouter.route("/task-status").put(verifyUser, taskStatus)

// delete task
taskRouter.route("/delete-task").put(verifyUser, deleteTask)
export default taskRouter