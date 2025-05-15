import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  HiOutlineSearch,
  HiOutlineShoppingBag,
  HiOutlineMenu,
  HiOutlineX,
} from 'react-icons/hi';
import { FaUser, FaCoins } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const navItems = {
  Clothing: [
    { name: "Men's Collection", href: '/category/clothing' },
    { name: "Women's Collection", href: '/category/clothing' },
    { name: 'New Arrivals', href: '/category/clothing' },
    { name: 'Best Sellers', href: '/category/clothing' },
    { name: 'Sale', href: '/category/clothing' },
  ],
  Hair: [
    { name: 'Wigs', href: '/category/hair' },
    { name: 'Extensions', href: '/category/hair' },
    { name: 'Hair Care', href: '/category/hair' },
    { name: 'Accessories', href: '/category/hair' },
    { name: 'Styling Tools', href: '/category/hair' },
  ],
  'Skin Care': [
    { name: 'Face Care', href: '/category/skin-care' },
    { name: 'Body Care', href: '/category/skin-care' },
    { name: 'Hair & Scalp', href: '/category/skin-care' },
    { name: 'Gift Sets', href: '/category/skin-care' },
    { name: 'Best Sellers', href: '/category/skin-care' },
  ],
  Makeup: [
    { name: 'Face', href: '/category/makeup' },
    { name: 'Eyes', href: '/category/makeup' },
    { name: 'Lips', href: '/category/makeup' },
    { name: 'Brushes & Tools', href: '/category/makeup' },
    { name: 'Gift Sets', href: '/category/makeup' },
  ],
  Sustainability: [
    { name: 'Recycle Program', href: '/recycle' },
    { name: 'Our Impact', href: '/sustainability/impact' },
    { name: 'Eco-Friendly Products', href: '/sustainability/eco' },
    { name: 'Sustainable Practices', href: '/sustainability/practices' },
    { name: 'Join Our Mission', href: '/sustainability/join' },
  ],
};

export default function Navbar({ isSignedIn, onSignOut }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { totalItems } = useCart();
  const { profileImage, userData } = useUser();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState('');
  const searchRef = useRef();

  // Close mobile menu on navigation
  useEffect(() => setIsMobileOpen(false), [location.pathname]);
  // Hide search on route change
  useEffect(() => setShowSearch(false), [location.pathname]);
  // Auto-focus search input
  useEffect(() => {
    if (showSearch) searchRef.current?.focus();
  }, [showSearch]);

  const goHome = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate('/');
  };

  const submitSearch = (e) => {
    e.preventDefault();
    const term = query.trim();
    if (!term) return setShowSearch(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
    setQuery('');
  };

  return (
    <>
      {/* backdrop for dropdown */}
      <div
        className={`
          fixed inset-0 bg-white/30 backdrop-blur-md z-10
          transition-opacity duration-300
          ${activeDropdown ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      />

      <header className="fixed inset-x-0 top-0 z-20 flex items-center justify-between
                         bg-white/70 backdrop-blur-md px-4 sm:px-6 py-4
                         border-b border-gray-200/50">
        {/* Logo */}
        <Link
          to="/"
          onClick={goHome}
          className="font-bodoni text-3xl sm:text-4xl text-black hover:opacity-80 transition-opacity"
        >
          Dappr.
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-6 font-poppins text-sm text-gray-800 relative">
          {Object.entries(navItems).map(([cat, items]) => (
            <div
              key={cat}
              className="relative"
              onMouseEnter={() => setActiveDropdown(cat)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                to={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                className="py-2 hover:text-gray-400 transition"
              >
                {cat}
              </Link>

              {activeDropdown === cat && (
                <div className="absolute top-full left-0 mt-0 bg-white/90 backdrop-blur-md
                                shadow rounded-b px-4 py-2 min-w-[160px] z-30">
                  {items.map((i) => (
                    <Link
                      key={i.name}
                      to={i.href}
                      className="block text-black hover:text-gray-400 transition py-2"
                    >
                      {i.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          {/* Recycle */}
          <button
            onClick={() => navigate('/recycle')}
            className="hidden sm:inline-block bg-black text-white text-xs sm:text-sm
                       px-4 py-2 rounded border border-black hover:bg-white hover:text-black transition"
          >
            Recycle Now!
          </button>

          {/* AI Stylist */}
          <button
            onClick={() => navigate('/ai-assistant')}
            className="hidden sm:inline-flex items-center gap-1 text-xs sm:text-sm
                       bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded
                       border border-transparent hover:border-purple-600 hover:from-white hover:to-white
                       hover:text-purple-600 transition"
          >
            AI Stylist
          </button>

          {/* Search */}
          <div className="relative">
            {showSearch ? (
              <form
                onSubmit={submitSearch}
                className="absolute right-0 top-full mt-2 flex w-64 z-40 shadow"
              >
                <input
                  ref={searchRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l
                             focus:outline-none focus:ring-1 focus:ring-black bg-white text-sm"
                  placeholder="Search…"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white rounded-r border border-black"
                >
                  <HiOutlineSearch className="w-5 h-5" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setShowSearch(true)}
                className="text-black hover:text-gray-600 transition"
              >
                <HiOutlineSearch className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Points */}
          {isSignedIn && userData && (
            <Link
              to="/profile?tab=rewards"
              className="flex items-center gap-1 text-black-600 hover:text-gray-600 transition"
            >
              <FaCoins className="w-5 h-5" />
              <span className="text-sm">{userData.recyclePoints}</span>
            </Link>
          )}

          {/* Cart */}
          <Link
            to="/cart"
            className="text-black hover:text-gray-600 transition relative"
          >
            <HiOutlineShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs
                             w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Profile/Sign In */}
          {isSignedIn && userData ? (
            <div className="relative">
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  setActiveDropdown(activeDropdown === 'profile' ? null : 'profile');
                }}
                className="w-8 h-8 rounded-full overflow-hidden border-2 border-black hover:border-gray-400 transition"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>
              {activeDropdown === 'profile' && (
                <div className="absolute right-0 top-full mt-2 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-30">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/profile?tab=orders"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Orders
                  </Link>
                  <Link
                    to="/profile?tab=rewards"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Rewards
                  </Link>
                  <button
                    onClick={() => {
                      setActiveDropdown(null);
                      onSignOut();
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="text-black hover:text-gray-600 transition"
            >
              <FaUser className="w-5 h-5" />
            </Link>
          )}

          {/* Mobile toggle */}
          <button className="md:hidden text-black" onClick={() => setIsMobileOpen((o) => !o)}>
            {isMobileOpen ? <HiOutlineX className="w-6 h-6" /> : <HiOutlineMenu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`
          fixed inset-0 bg-white z-30 transform transition-transform duration-300
          ${isMobileOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ paddingTop: '4rem' }}
      >
        <div className="px-6 pb-24 overflow-y-auto h-full relative">
          <button
            className="absolute top-4 right-4 p-1 bg-gray-100 rounded-full"
            onClick={() => setIsMobileOpen(false)}
          >
            <HiOutlineX className="w-6 h-6" />
          </button>

          {Object.entries(navItems).map(([cat, items]) => (
            <div key={cat} className="border-b border-gray-200 py-2">
              <button
                onClick={() =>
                  setActiveSubmenu((s) => (s === cat ? null : cat))
                }
                className="w-full flex justify-between items-center text-lg font-medium"
              >
                {cat}
                <span className="text-2xl leading-none">
                  {activeSubmenu === cat ? '−' : '+'}
                </span>
              </button>
              {activeSubmenu === cat && (
                <div className="pl-4 pt-2 space-y-2">
                  {items.map((i) => (
                    <Link
                      key={i.name}
                      to={i.href}
                      onClick={() => setIsMobileOpen(false)}
                      className="block text-gray-600 hover:text-black"
                    >
                      {i.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-4 space-y-4">
            <button
              onClick={() => navigate('/recycle')}
              className="w-full py-3 bg-black text-white rounded text-center"
            >
              Recycle Now!
            </button>
            {!isSignedIn && (
              <button
                onClick={() => navigate('/auth')}
                className="w-full py-3 border border-black text-black rounded text-center"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
