import { Link, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { FaCoins } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

function Navbar({ isSignedIn, onSignOut }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRefs = useRef({});
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { totalItems } = useCart();
  const { profileImage, userData } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef(null);
  
  // Focus search input when search box appears
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);
  
  // Hide search on route change
  useEffect(() => {
    setShowSearch(false);
  }, [location.pathname]);

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

  // Handle search submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
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
                  className="absolute top-full left-0 z-30 mt-0 bg-white/90 backdrop-blur-md backdrop-saturate-150 shadow-md rounded-b px-4 py-2 min-w-[160px]"
                >
                  <div className="text-sm font-poppins py-2">
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-black hover:text-gray-400 transition duration-200 py-2 border-b border-transparent hover:border-gray-400 cursor-pointer"
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
          
          <button 
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-sm text-white px-4 py-2 rounded-md hover:from-purple-700 hover:to-blue-700 transition duration-300 cursor-pointer flex items-center"
            onClick={() => navigate('/ai-assistant')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
            </svg>
            AI Stylist
          </button>
          
          <div className="relative">
            {showSearch ? (
              <form onSubmit={handleSearchSubmit} className="absolute right-0 top-full mt-2 w-64 flex shadow-md z-50">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-black bg-white"
                  onBlur={() => {
                    // Small delay to allow for button click
                    setTimeout(() => {
                      if (!searchQuery.trim()) {
                        setShowSearch(false);
                      }
                    }, 200);
                  }}
                />
                <button 
                  type="submit"
                  className="bg-black text-white px-3 py-2 rounded-r border border-black"
                >
                  <HiOutlineSearch className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <button 
                className="text-black hover:text-gray-600 transition-colors cursor-pointer" 
                onClick={() => setShowSearch(true)}
              >
                <HiOutlineSearch className="w-6 h-6" />
              </button>
            )}
          </div>

          {isSignedIn && (
            <>
              <div 
                className="flex items-center space-x-1 text-black cursor-pointer hover:text-gray-600 transition-colors"
                onClick={() => navigate('/profile?tab=rewards')}
              >
                <FaCoins className="w-5 h-5" />
                <span className="font-medium">{userData.recyclePoints}</span>
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
                className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 hover:opacity-90 transition-opacity focus:outline-none cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
              
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white/90 backdrop-blur-md backdrop-saturate-150 border border-gray-200/50 rounded shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                      <img 
                        src={profileImage} 
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium truncate">{userData.name}</p>
                      <p className="text-sm text-gray-500 truncate">{userData.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-sm text-black hover:text-gray-400 transition duration-200 border-b border-transparent hover:border-gray-400 cursor-pointer"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Profile
                  </Link>
                  <Link 
                    to="/orders" 
                    className="block px-4 py-2 text-sm text-black hover:text-gray-400 transition duration-200 border-b border-transparent hover:border-gray-400 cursor-pointer"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    My Orders
                  </Link>
                  <Link 
                    to="/recycle/history" 
                    className="block px-4 py-2 text-sm text-black hover:text-gray-400 transition duration-200 border-b border-transparent hover:border-gray-400 cursor-pointer"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Recycling History
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-1">
                    <button 
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:text-red-400 transition duration-200 border-b border-transparent hover:border-red-400 cursor-pointer"
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