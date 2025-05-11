// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
    return (
      <header className="w-full px-6 py-4 flex justify-between items-center">
        <Link to="/" className="font-bodoni text-4xl font-semibold tracking-tight text-black hover:opacity-80 transition-opacity">
          Dappr.
        </Link>
  
        <nav className="font-poppins flex space-x-6 text-sm text-gray-800">
          <a href="#" className="hover:text-gray-400 transition duration-200">Clothing</a>
          <a href="#" className="hover:text-gray-400 transition duration-200">Hair</a>
          <a href="#" className="hover:text-gray-400 transition duration-200">Skin Care</a>
          <a href="#" className="hover:text-gray-400 transition duration-200">Makeup</a>
          <a href="#" className="hover:text-gray-400 transition duration-200">Sustainability</a>
        </nav>
  
        <button className="bg-black text-sm text-white border border-gray-500 px-3 py-1 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer">
          Sign In
        </button>
      </header>
    );
  }
  
  export default Navbar;
  