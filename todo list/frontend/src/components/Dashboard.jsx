/* eslint-disable react/prop-types */

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const[flag, setFlag ]  = useState(false);
  // iam using this to fetch the tasks from backend
  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/tasks/tasks",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.log(error, " error while fetchin tasks");
      }
    };
    getTasks();
  }, [flag]);

  function handleComplete(taskId,isCompleted) {
    isCompleted = !isCompleted
    try {
      (async () => {
        await axios.put(
          `http://localhost:5000/api/v1/tasks/task-status?taskId=${taskId}`,
          {isCompleted:isCompleted},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setFlag(prev=>!prev)
      })();
    } catch (error) {
      alert(error)
    }
  }
  function handleDelete(taskId) {
    try {
      console.log("this is task id", taskId);
      (async () => {
        await axios.put(
          `http://localhost:5000/api/v1/tasks/delete-task?taskId=${taskId}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("in delete task tab")
        
        
        setFlag( (prev)=>!prev );
      })();
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="container mx-auto min-h-full w-1/2 p-4">
      <h1 className="text-2xl text-black font-bold mb-4">Dashboard</h1>
      {data.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((task) => (
           <li
           key={task._id}
           className={`p-4 border rounded-lg shadow hover:shadow-md transition flex justify-between items-center ${task.isCompleted ? 'bg-red-300' : 'bg-white'}`}
         >
           <div>
             <h2 className={`font-semibold ${task.isCompleted ? 'text-gray-500' : 'text-blue-600'}`}>
               {task.taskName}
             </h2>
             <p className={`text-gray-600 ${task.isCompleted ? 'line-through' : ''}`}>
               {task.taskDescription}
             </p>
           </div>
           <div className="flex space-x-2">
             <button
               className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
               onClick={() => handleComplete(task._id, task.isCompleted)} // Add the handler for complete
             >
               Complete
             </button>
             <button
               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
               onClick={() => handleDelete(task._id)} // Add the handler for delete
             >
               Delete
             </button>
           </div>
         </li>
         
          ))}
        </ul>
      )}
      <button
        className="bg-slate-300 fixed bottom-10 right-60 hover:bg-slate-600"
        onClick={() => navigate("/add-task")}
      >
        Add Task
      </button>
    </div>
  );
};

export default Dashboard;
