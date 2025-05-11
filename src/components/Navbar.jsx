// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi';
import { RiCoinsLine } from 'react-icons/ri';
import { useState, useEffect, useRef } from 'react';

function Navbar() {
    const navigate = useNavigate();
    const [activeDropdown, setActiveDropdown] = useState(null);
    const navRef = useRef();

    // Close dropdown on outside click
    useEffect(() => {
      function handleClickOutside(event) {
        if (navRef.current && !navRef.current.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const handleLogoClick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        navigate('/');
    };

    const navItems = {
        Clothing: [
            { name: "Men's Collection", href: "/clothing/mens" },
            { name: "Women's Collection", href: "/clothing/womens" },
            { name: "New Arrivals", href: "/clothing/new" },
            { name: "Best Sellers", href: "/clothing/bestsellers" },
            { name: "Sale", href: "/clothing/sale" }
        ],
        Hair: [
            { name: "Wigs", href: "/hair/wigs" },
            { name: "Extensions", href: "/hair/extensions" },
            { name: "Hair Care", href: "/hair/care" },
            { name: "Accessories", href: "/hair/accessories" },
            { name: "Styling Tools", href: "/hair/tools" }
        ],
        "Skin Care": [
            { name: "Face Care", href: "/skincare/face" },
            { name: "Body Care", href: "/skincare/body" },
            { name: "Hair & Scalp", href: "/skincare/scalp" },
            { name: "Gift Sets", href: "/skincare/gifts" },
            { name: "Best Sellers", href: "/skincare/bestsellers" }
        ],
        Makeup: [
            { name: "Face", href: "/makeup/face" },
            { name: "Eyes", href: "/makeup/eyes" },
            { name: "Lips", href: "/makeup/lips" },
            { name: "Brushes & Tools", href: "/makeup/tools" },
            { name: "Gift Sets", href: "/makeup/gifts" }
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
      <header className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center bg-white/70 backdrop-blur-md backdrop-saturate-150 z-50 border-b border-gray-200/50">
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="font-bodoni text-4xl font-semibold tracking-tight text-black hover:opacity-80 transition-opacity cursor-pointer"
        >
          Dappr.
        </Link>
  
        <nav ref={navRef} className="font-poppins flex space-x-6 text-sm text-gray-800 relative">
          {Object.entries(navItems).map(([category, items]) => (
            <div
              key={category}
              className="relative"
            >
              <a
                href="#"
                className="hover:text-gray-400 transition duration-200 cursor-pointer"
                onClick={e => {
                  e.preventDefault();
                  setActiveDropdown(activeDropdown === category ? null : category);
                }}
              >
                {category}
              </a>
              {activeDropdown === category && (
                <div className="fixed left-0 right-0 top-[72px] w-screen bg-white shadow-lg py-8 z-40 border-t border-gray-100 flex justify-start px-12" style={{minHeight: '220px'}}>
                  <div className="flex flex-col space-y-2 max-w-2xl w-full">
                    <h3 className="font-semibold text-lg text-black mb-2">{category}</h3>
                    {items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="block text-base text-gray-700 hover:text-black transition duration-200 py-1"
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
  