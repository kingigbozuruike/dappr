// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { RiCoinsLine } from 'react-icons/ri';

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
          className="font-bodoni text-4xl font-semibold tracking-tight text-black hover:opacity-80 transition-opacity cursor-pointer"
        >
          Dappr.
        </Link>
  
        <nav className="font-poppins flex space-x-6 text-sm text-gray-800">
          <a href="#" className="hover:text-gray-400 transition duration-200 cursor-pointer">Clothing</a>
          <a href="#" className="hover:text-gray-400 transition duration-200 cursor-pointer">Hair</a>
          <a href="#" className="hover:text-gray-400 transition duration-200 cursor-pointer">Skin Care</a>
          <a href="#" className="hover:text-gray-400 transition duration-200 cursor-pointer">Makeup</a>
          <a href="#" className="hover:text-gray-400 transition duration-200 cursor-pointer">Sustainability</a>
        </nav>

        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button className="text-black hover:text-gray-600 transition-colors cursor-pointer">
            <HiOutlineSearch className="w-6 h-6" />
          </button>

          {/* Points Display */}
          <div className="flex items-center space-x-1 text-black cursor-pointer">
            <RiCoinsLine className="w-6 h-6" />
            <span className="font-medium">250</span>
          </div>

          {/* Cart Icon */}
          <button className="text-black hover:text-gray-600 transition-colors relative cursor-pointer">
            <HiOutlineShoppingBag className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
  
          <button className="bg-black text-sm text-white border border-gray-500 px-3 py-1 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer">
            Sign In
          </button>
        </div>
      </header>
    );
  }
  
  export default Navbar;
  