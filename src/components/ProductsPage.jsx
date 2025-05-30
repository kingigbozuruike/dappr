import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import ProductFilter from "./ProductFilter";
import { productsByCategory } from "./ProductCategoryPage";
import Product1 from "../assets/products/product1.webp";
import Product2 from "../assets/products/product2.webp";
import Product3 from "../assets/products/product3.webp";
import Product4 from "../assets/products/product4.jpg";
import Product5 from "../assets/products/product5.webp";
import Product6 from "../assets/products/product6.webp";
import Product7 from "../assets/products/product7.webp";
import Product8 from "../assets/products/product8.webp";
import Product9 from "../assets/products/product9.jpg";
import Product10 from "../assets/products/product10.avif";
import Product11 from "../assets/products/product11.jpg";
import Product12 from "../assets/products/product12.jpg";
import Model from "../assets/products/Model for eco dress front.png";
import { FaFilter, FaTimes } from "react-icons/fa";

// Map file names → imported images
const getCorrectImagePath = (path) => {
  const name = path.split("/").pop();
  const map = {
    "product1.webp": Product1,
    "product2.webp": Product2,
    "product3.webp": Product3,
    "product4.jpg": Product4,
    "product5.webp": Product5,
    "product6.webp": Product6,
    "product7.webp": Product7,
    "product8.webp": Product8,
    "product9.jpg": Product9,
    "product10.avif": Product10,
    "product11.jpg": Product11,
    "product12.jpg": Product12,
    "Model for eco dress front.png": Model
  };
  return map[name] || path;
};

// Flatten all categories into one unified list
const getAllProducts = () =>
  Object.entries(productsByCategory).flatMap(([cat, items]) =>
    items.map((p) => ({
      ...p,
      category: cat,
      image: getCorrectImagePath(p.image),
    }))
  );

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [displayCount, setDisplayCount] = useState(8);
  const filterMenuRef = useRef();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();

  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "hair", name: "Hair" },
    { id: "skin-care", name: "Skin Care" },
    { id: "makeup", name: "Makeup" },
  ];

  // Initial load
  useEffect(() => {
    window.scrollTo(0, 0);
    const all = getAllProducts();
    setProducts(all);
    setFilteredProducts(all);
  }, []);

  // When the top‐level category changes, reset the list
  useEffect(() => {
    const all = getAllProducts();
    if (activeFilter === "all") {
      setProducts(all);
      setFilteredProducts(all);
    } else {
      const subset = all.filter((p) => p.category === activeFilter);
      setProducts(subset);
      setFilteredProducts(subset);
    }
  }, [activeFilter]);

  // Filtering + sorting logic
  const handleFilterChange = useCallback(
    (filters) => {
      let result = [...products];

      // Sort
      if (filters.sort !== "Recommended") {
        switch (filters.sort) {
          case "Price: Low to High":
            result.sort((a, b) => a.price - b.price);
            break;
          case "Price: High to Low":
            result.sort((a, b) => b.price - a.price);
            break;
          case "Name: A to Z":
            result.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case "Name: Z to A":
            result.sort((a, b) => b.name.localeCompare(a.name));
            break;
        }
      }

      // Price range
      if (filters.priceRange !== "All Prices") {
        switch (filters.priceRange) {
          case "Under $25":
            result = result.filter((p) => p.price < 25);
            break;
          case "$ 25 - $ 50":
            result = result.filter((p) => p.price >= 25 && p.price <= 50);
            break;
          case "$ 50 - $ 100":
            result = result.filter((p) => p.price > 50 && p.price <= 100);
            break;
          case "Over $ 100":
            result = result.filter((p) => p.price > 100);
            break;
        }
      }

      // Type (only if a sub‐category is chosen)
      if (activeFilter !== "all" && filters.type !== "All Types") {
        const tv = filters.type.toLowerCase().replace(/\s+/g, "-");
        result = result.filter((p) => p.type === tv);
      }

      // Size (only when user actually picks a size)
      if (filters.size !== "All Sizes") {
        const sv = filters.size.toLowerCase();
        result = result.filter((p) => {
          // only clothing items have sizes
          if (p.category !== "clothing") return true;
          return p.size && p.size.includes(sv);
        });
      }

      setFilteredProducts(result);
    },
    [products, activeFilter]
  );

  // Mobile panel toggles
  const toggleFilterMenu = () => setShowFilterMenu((v) => !v);
  const closeFilterMenu = () => setShowFilterMenu(false);

  // click‐outside closes panel
  useEffect(() => {
    const onClick = (e) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(e.target) &&
        !e.target.closest("[data-filter-toggle]")
      ) {
        setShowFilterMenu(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleProductClick = (category, id) => {
    navigate(`/product/${category}/${id}`);
  };

  return (
    <div className="mt-24 px-4 sm:px-10 py-8">
      {/* Mobile filter FAB */}
      <div className="fixed top-20 right-4 z-40 md:hidden">
        <button
          onClick={toggleFilterMenu}
          data-filter-toggle="true"
          className="bg-black text-white p-3 rounded-full shadow-lg border-2 border-white hover:bg-white hover:text-black hover:border-black transition duration-300 cursor-pointer"
          aria-label="Open filters"
        >
          <FaFilter className="h-5 w-5" />
        </button>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity ${
          showFilterMenu ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleFilterMenu}
      />

      {/* Slide-in panel */}
      <div
        ref={filterMenuRef}
        className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-xl transform transition-transform ${
          showFilterMenu ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ paddingTop: "1rem" }}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              onClick={closeFilterMenu}
              aria-label="Close filters"
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>

          {/* ← categories moved here on mobile */}
          <div className="flex flex-col gap-2 mb-4">
            {categories.map((c) => (
              <button
                key={c.id}
                className={`px-4 py-2 rounded-full transition duration-300 text-left ${
                  activeFilter === c.id
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>

          <ProductFilter
            category={activeFilter}
            onFilterChange={handleFilterChange}
            isMobile={true}
            onClose={closeFilterMenu}
          />
        </div>
      </div>

      <h1 className="text-4xl font-bold font-bodoni mb-8 text-center">
        {activeFilter === "all" ? "All Products" : categories.find(c => c.id === activeFilter)?.name}
      </h1>

      {/* desktop: top tabs */}
      <div className="hidden md:flex justify-center flex-wrap gap-4 mb-10">
        {categories.map((c) => (
          <button
            key={c.id}
            className={`px-4 py-2 rounded-full transition duration-300 ${
              activeFilter === c.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter(c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* desktop: filter row */}
      <div className="hidden md:block mb-8">
        <ProductFilter
          category={activeFilter}
          onFilterChange={handleFilterChange}
          isMobile={false}
        />
      </div>

      {/* grid: 2 cols mobile, 3 md, 4 lg */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">
            No products found matching your filters.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {filteredProducts.slice(0, displayCount).map((p) => (
              <motion.div
                key={`${p.category}-${p.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 group cursor-pointer flex flex-col h-[420px] sm:h-[480px] md:h-[520px]"
                onClick={() => handleProductClick(p.category, p.id)}
              >
                <div className="relative overflow-hidden h-48 sm:h-64 md:h-72 flex-shrink-0">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                  <h3 className="font-poppins text-sm sm:text-base md:text-lg font-medium mb-1 line-clamp-2">
                    {p.name}
                  </h3>
                  <p className="text-gray-700 font-semibold mb-2">
                    ${p.price.toFixed(2)}
                  </p>
                  <div className="flex justify-between text-gray-500 text-sm mt-1 mb-2">
                    <span className="capitalize">
                      {p.category.replace("-", " ")}
                    </span>
                    {p.type && (
                      <span className="capitalize">{p.type.replace("-", " ")}</span>
                    )}
                  </div>
                  {p.category === "clothing" && p.size && (
                    <p className="text-gray-500 text-xs mb-2">
                      Sizes: {p.size.map((s) => s.toUpperCase()).join(", ")}
                    </p>
                  )}
                  {cart[`${p.category}-${p.id}`] > 0 ? (
                    <div className="mt-auto flex flex-col space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 text-xs sm:text-sm font-medium">
                          Added to cart
                        </span>
                        <span className="text-xs sm:text-sm font-medium">
                          ${(p.price * cart[`${p.category}-${p.id}`]).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border rounded-md p-1">
                        <button
                          onClick={() => decreaseQuantity(p.id, p.category)}
                          className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-l border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                        >
                          –
                        </button>
                        <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white font-medium">
                          {cart[`${p.category}-${p.id}`]}
                        </span>
                        <button
                          onClick={() => increaseQuantity(p.id, p.category)}
                          className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-r border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(p.id, p.category)}
                      className="mt-auto w-full bg-black text-white text-xs sm:text-sm py-2 px-4 rounded border border-black hover:bg-white hover:text-black transition cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredProducts.length > displayCount && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setDisplayCount(prev => prev + 8)}
                className="font-poppins px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-black text-white rounded border border-black hover:bg-white hover:text-black transition duration-300"
              >
                Show More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
