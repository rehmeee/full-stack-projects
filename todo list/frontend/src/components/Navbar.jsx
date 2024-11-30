
function Navbar() {
  return (
   
    <nav className="bg-blue-600 text-white px-4 py-2 shadow-md flex justify-between items-center rounded-l">
    {/* Logo Section */}
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-bold">TodoList</span>
    </div>

    {/* Buttons Section */}
    <div className="flex items-center space-x-4">
      <button
        className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition duration-300"
       
      >
        Contact Us
      </button>
     
    </div>
  </nav>
  )
}

export default Navbar