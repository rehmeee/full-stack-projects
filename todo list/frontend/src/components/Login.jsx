/* eslint-disable react/prop-types */

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ handlesetData }) => {
  const navigate = useNavigate();
  // states to control the form data
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function getcookie(name){
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`)
    if(parts.length ===2){
      return parts.pop().split(";").shift()
    }
    return null 
  }
  // handle submint
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          withCredentials:true
        }
      );
      console.log(response)
      if (response.status === 200) {
        // console.log(response.data)

        // console.log(document.cookie) 
        localStorage.setItem("accessToken", getcookie("accessToken"))
        localStorage.setItem("refreshToken", getcookie("refreshToken"))
        handlesetData(response.data.data);

        navigate("/dashboard");
      } else {
        console.log("you loged in faliled");
        alert("Password and username is incorrect");
      }
    } catch (error) {
      console.log(error, "errrow while login");
      alert("Please Enter Correct username and Password")
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl text-red-400 font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
