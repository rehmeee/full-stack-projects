import Home from "./components/Home"
import {Route,Routes} from 'react-router-dom'
import RegisterForm from "./components/RegisterForm"
import Login from "./components/Login"
import { useState } from "react"
import Dashboard from "./components/Dashboard"
import AddTask from "./components/AddTask"
function App() {
const[data, setData] = useState({})
function handlesetData (commingData){
  sessionStorage.setItem("userInfo", JSON.stringify(commingData))
  setData(commingData);
}
  return (
    <div>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={<RegisterForm/>}/>
    <Route path="/login" element={<Login handlesetData ={handlesetData}/>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard data={data}/>}/>
    <Route path="/add-task" element={<AddTask handlesetData ={handlesetData}/>}/>

    </Routes>
    </div>
  )
}

export default App

