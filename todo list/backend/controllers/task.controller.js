import { Task } from "../models/tasks.model.js";
import { User } from "../models/user.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// add task
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
  return res.status(200).json(new ApiResponse(200, tasks, "success"));
});

// Change the status of the task
const taskStatus = asyncHandler(async (req, res) => {
  try {
    const { taskId } = req?.query;
    const { isCompleted } = req?.body;
    console.log(taskId, isCompleted, "task id and is completed");
    if (!taskId) {
      throw new ApiErrors(400, "taskid or flag is missing");
    }
    const a = await Task.findById(taskId)

    console.log(a);
    // a.isCompleted = 
    const task = await Task.findByIdAndUpdate(taskId,{
      isCompleted: isCompleted
    },{
      new:true
    })
    return res.status(200).json(new ApiResponse(200, task));
  } catch (error) {
    throw new ApiErrors(400, "error while changing the status of the Task");
  }
});

// delete task
const deleteTask = asyncHandler(async (req, res) => {
  const { taskId } = req?.query;

  if (!taskId) {
    throw new ApiErrors(400, "no task id found");
  }
  await Task.deleteOne({ _id: taskId });
  return res.status(200).json(new ApiResponse(200, {}));
});

// get tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req?.user._id });
  if (!tasks) {
    throw new ApiErrors(400, "error While fetcing the tasks");
  }
  return res.status(200).json(new ApiResponse(200, tasks));
});
export { addTask, taskStatus, deleteTask, getTasks };
