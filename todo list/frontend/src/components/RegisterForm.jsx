import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const RegisterForm = () => {
  const navigate= useNavigate()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
    try {
        (async () => {
          await axios.post("http://localhost:5000/api/v1/users/register",{
            username,
            email,
            password
          },{
            headers:{
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
        })();
        navigate("/dashboard")
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit}>
          {/* username Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={e=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
