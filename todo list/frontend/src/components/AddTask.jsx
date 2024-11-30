/* eslint-disable react/prop-types */
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
function AddTask({handlesetData}) {
    const navigate = useNavigate()
    const[taskName, setTaskName] = useState("")
    const[taskDescription, setTaskDescription] = useState("")
   async function handleSubmit(e){
        e.preventDefault();

        try {
         // const accessToken = localStorage.getItem("accessToken")
          //const refreshToken = localStorage.getItem("refreshToken")
          const response = await axios.post("http://localhost:5000/api/v1/tasks/add-task",{
            taskName,
            taskDescription
          },{
            headers:{
              "Content-Type" : "application/x-www-form-urlencoded"
            },
            withCredentials:true
          })
          if(response.status ===200){
            handlesetData(response.data);
            navigate("/dashboard")
          }
          
  
        } catch (error) {
          console.log(error, "error while adding Task")
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-slate-200 p-10 rounded-xl">
            <div className="mb-4">
            <label htmlFor="taskName" className="block text-gray-700 font-semibold mb-2">
             Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
            <div className="mb-4">
            <label htmlFor="taskDescription" className="block text-gray-700 font-semibold mb-2">
              Task Description
            </label>
            <textarea
              id="taskDescription"
              name="taskDescription"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-9 p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Add Task
          </button>
            </form>
        </div>
    )
}

export default AddTask
