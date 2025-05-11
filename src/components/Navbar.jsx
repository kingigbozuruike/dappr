// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/');
    };

    return (
      <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md backdrop-saturate-150 z-50 border-b border-gray-200/50">
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="font-bodoni text-4xl font-semibold tracking-tight text-black hover:opacity-80 transition-opacity"
        >
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
          Sign In or Join
        </button>
      </header>
    );
  }
  
  export default Navbar;
  