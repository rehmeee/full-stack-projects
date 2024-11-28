import { Task } from "../models/tasks.model.js";
import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const addTask = asyncHandler(async (req, res) => {
  const { taskName, taskDescription } = req?.body;
  if (!taskName) {
    throw new ApiErrors(400, "Task Name is Required");
  }
  const user = await User.findById(req?.user._id);
  const task = await Task.create({
    user,
    taskName,
    taskDescription,
  });
  if (!task) {
    throw new ApiErrors(400, "Error while creating task");
  }

  const tasks = await Task.find({ user: user?._id });
  if (!tasks) {
    throw new ApiErrors(400, "error while fetcing tasks");
  }
  return res
  .status(200)
  .json(new ApiResponse(200, tasks, "success"))
});


export{addTask}