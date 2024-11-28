import express from "express"
import { verifyUser } from "../middlewares/auth.middleware.js";
import { addTask } from "../controllers/task.controller.js";

const taskRouter = express.Router();

taskRouter.route("/add-task").post(verifyUser, addTask)

export default taskRouter