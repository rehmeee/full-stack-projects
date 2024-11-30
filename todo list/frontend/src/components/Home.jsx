import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
  return (
    <div className="bg-gray-100  py-12 flex flex-col items-center justify-center space-y-6">
    {/* Heading Section */}
    <h2 className="text-3xl font-bold text-gray-800">Welcome to TodoList</h2>
    <p className="text-gray-600 text-lg">Manage your tasks with ease!</p>

    {/* Buttons Section */}
    <div className="flex space-x-6">
      {/* Register Button */}
      <button
        className="bg-green-600 text-white font-semibold px-6 py-3 rounded hover:bg-green-700 transition duration-300"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
      {/* Login Button */}
      <button
        className="bg-blue-600 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition duration-300"
        onClick={() =>navigate("/login")}
      >
        Login
      </button>
    </div>
  </div>
);
  
}

export default Home