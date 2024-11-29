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
     const { taskId } = req?.params;
     const { isCompleted } = req?.body; 

     const task = await Task.findOneAndUpdate(taskId, {
        isCompleted:isCompleted
     },{
        new:true
     })
     return res
     .status(200)
     .json(new ApiResponse(200, task))
 } catch (error) {
    throw new ApiErrors(400, "error while changing the status of the Task")
 }

});

// delete task
const deleteTask = asyncHandler(async (req,res) => {
  
    const {taskId} = req?.params;
    await Task.deleteOne({_id : taskId})
    return res
    .status(200)
    .json(new ApiResponse(200, {}))
})
export { addTask, taskStatus , deleteTask};
