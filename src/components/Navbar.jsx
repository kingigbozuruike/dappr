import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { RiCoinsLine } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { useState, useRef } from 'react';
import { useCart } from '../context/CartContext';

function Navbar({ isSignedIn, onSignOut }) {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { totalItems } = useCart();

  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/');
  };

  const navItems = {
    Clothing: [
      { name: "Men's Collection", href: "/category/clothing" },
      { name: "Women's Collection", href: "/category/clothing" },
      { name: "New Arrivals", href: "/category/clothing" },
      { name: "Best Sellers", href: "/category/clothing" },
      { name: "Sale", href: "/category/clothing" }
    ],
    Hair: [
      { name: "Wigs", href: "/category/hair" },
      { name: "Extensions", href: "/category/hair" },
      { name: "Hair Care", href: "/category/hair" },
      { name: "Accessories", href: "/category/hair" },
      { name: "Styling Tools", href: "/category/hair" }
    ],
    "Skin Care": [
      { name: "Face Care", href: "/category/skin-care" },
      { name: "Body Care", href: "/category/skin-care" },
      { name: "Hair & Scalp", href: "/category/skin-care" },
      { name: "Gift Sets", href: "/category/skin-care" },
      { name: "Best Sellers", href: "/category/skin-care" }
    ],
    Makeup: [
      { name: "Face", href: "/category/makeup" },
      { name: "Eyes", href: "/category/makeup" },
      { name: "Lips", href: "/category/makeup" },
      { name: "Brushes & Tools", href: "/category/makeup" },
      { name: "Gift Sets", href: "/category/makeup" }
    ],
    Sustainability: [
      { name: "Recycle Program", href: "/recycle" },
      { name: "Our Impact", href: "/sustainability/impact" },
      { name: "Eco-Friendly Products", href: "/sustainability/eco" },
      { name: "Sustainable Practices", href: "/sustainability/practices" },
      { name: "Join Our Mission", href: "/sustainability/join" }
    ]
  };

  return (
    <>
      {/* Full-screen overlay - only shown when a dropdown is active */}
      <div 
        className={`fixed inset-0 bg-white/30 backdrop-blur-md z-10 transition-all duration-300 ease-in-out ${
          activeDropdown ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      
      <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md backdrop-saturate-150 z-20 border-b border-gray-200/50">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="font-bodoni text-4xl font-semibold tracking-tight text-black hover:opacity-80 transition-opacity cursor-pointer"
        >
          Dappr.
        </Link>

        <nav className="font-poppins flex space-x-6 text-sm text-gray-800 relative">
          {Object.entries(navItems).map(([category, items]) => (
            <div
              key={category}
              className="relative"
              onMouseEnter={() => setActiveDropdown(category)}
              onMouseLeave={() => setActiveDropdown(null)}
              ref={(el) => (dropdownRefs.current[category] = el)}
            >
              <a
                href= {`/category/${category}`.toLowerCase().replace(/\s+/g, '-')}
                className="py-2 hover:text-gray-400 transition duration-200 cursor-pointer"
              >
                {category}
              </a>
              
              {/* Dropdown menu */}
              {activeDropdown === category && (
                <div
                  className="absolute top-full left-0 z-30 mt-0"
                >
                  <div className="text-xl font-bold py-4 font-bodoni">
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-black hover:text-gray-700 transition py-1"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        
        <div className="flex items-center space-x-6 z-20">
          <button className="bg-black text-sm text-white border border-gray-500 px-3 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer animate-jiggle hover:animate-none" onClick={() => navigate('/recycle')}>
            Recycle Now!
          </button>
          <button className="text-black hover:text-gray-600 transition-colors cursor-pointer" onClick={() => navigate('/search')}>
            <HiOutlineSearch className="w-6 h-6" />
          </button>

          {isSignedIn && (
            <>
              <div className="flex items-center space-x-1 text-black cursor-pointer">
                <RiCoinsLine className="w-6 h-6" />
                <span className="font-medium">450</span>
              </div>
            </>
          )}
          
          <Link to="/cart" className="text-black hover:text-gray-600 transition-colors relative cursor-pointer">
            <HiOutlineShoppingBag className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </Link>

          {isSignedIn ? (
            <div className="relative">
              <button 
                className="flex items-center justify-center w-9 h-9 bg-black text-white rounded-full hover:bg-gray-800 transition-colors focus:outline-none hover:cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <FaUser className="w-4 h-4" />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md backdrop-saturate-150 border border-gray-200/50 rounded shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium">David Orisakwe</p>
                    <p className="text-sm text-gray-500">orisakwe@gmail.com</p>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/recycle/history" 
                    className="block px-4 py-2 text-sm hover:bg-gray-100 transition"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Recycling History
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-1">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                      onClick={() => {
                        onSignOut();
                        setShowProfileMenu(false);
                        navigate('/');
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              className="bg-black text-sm text-white border border-gray-500 px-3 py-1 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </button>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;