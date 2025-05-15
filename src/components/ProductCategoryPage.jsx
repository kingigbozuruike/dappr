import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { FaFilter, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import ProductFilter from "./ProductFilter";

// --- your demo data ---
export const productsByCategory = {
  clothing: [
    { id: 1, name: "Eco-friendly Cotton Dress", price: 89.99, image: "/src/assets/products/Model for eco dress front.png", type: "dresses", size: ["s", "m", "l"] },
    { id: 2, name: "Sustainable Denim Jeans", price: 79.99, image: "/src/assets/products/product2.webp", type: "bottoms", size: ["xs", "s", "m", "l", "xl"] },
    { id: 3, name: "Organic Linen Shirt", price: 59.99, image: "/src/assets/products/product3.webp", type: "tops", size: ["s", "m", "l", "xl"] },
    { id: 4, name: "Recycled Polyester Jacket", price: 129.99, image: "/src/assets/products/product4.jpg", type: "outerwear", size: ["m", "l", "xl"] },
    { id: 5, name: "Hemp Casual Pants", price: 69.99, image: "/src/assets/products/product5.webp", type: "bottoms", size: ["s", "m", "l"] },
    { id: 6, name: "Bamboo Fiber T-shirt", price: 39.99, image: "/src/assets/products/product6.webp", type: "tops", size: ["xs", "s", "m", "l", "xl"] },
    { id: 7, name: "Organic Cotton Sweater", price: 89.99, image: "/src/assets/products/product7.webp", type: "tops", size: ["s", "m", "l"] },
    { id: 8, name: "Upcycled Denim Skirt", price: 64.99, image: "/src/assets/products/product8.webp", type: "bottoms", size: ["xs", "s", "m"] },
    { id: 9, name: "Fair Trade Wool Cardigan", price: 94.99, image: "/src/assets/products/product9.jpg", type: "outerwear", size: ["m", "l", "xl"] },
    { id: 10, name: "Recycled Nylon Activewear", price: 74.99, image: "/src/assets/products/product10.avif", type: "tops", size: ["s", "m", "l"] },
    { id: 11, name: "Sustainable Cotton Hoodie", price: 84.99, image: "/src/assets/products/product11.jpg", type: "tops", size: ["s", "m", "l", "xl"] },
    { id: 12, name: "Eco-friendly Lounge Set", price: 99.99, image: "/src/assets/products/product12.jpg", type: "tops", size: ["m", "l"] },
    { id: 13, name: "Ethical Silk Blouse", price: 109.99, image: "/src/assets/testing.png", type: "tops", size: ["xs", "s", "m"] },
    { id: 14, name: "Zero-waste Linen Jumpsuit", price: 119.99, image: "/src/assets/testing2.png", type: "dresses", size: ["s", "m", "l"] },
    { id: 15, name: "Biodegradable Raincoat", price: 149.99, image: "/src/assets/testing3.png", type: "outerwear", size: ["m", "l", "xl"] },
  ],
  hair: [
    { id: 1, name: "Organic Shampoo", price: 24.99, image: "/src/assets/products/product5.webp", type: "shampoo" },
    { id: 2, name: "Natural Conditioner", price: 26.99, image: "/src/assets/products/product6.webp", type: "conditioner" },
    { id: 3, name: "Sulfate-Free Hair Mask", price: 34.99, image: "/src/assets/products/product7.webp", type: "treatment" },
    { id: 4, name: "Eco-friendly Hair Spray", price: 19.99, image: "/src/assets/products/product8.webp", type: "styling" },
    { id: 5, name: "Sustainable Hair Serum", price: 29.99, image: "/src/assets/products/product9.jpg", type: "styling" },
    { id: 6, name: "Plant-based Hair Dye", price: 22.99, image: "/src/assets/products/product10.avif", type: "treatment" },
    { id: 7, name: "Bamboo Hairbrush", price: 18.99, image: "/src/assets/products/product11.jpg", type: "accessories" },
    { id: 8, name: "Silk Scrunchies Set", price: 15.99, image: "/src/assets/products/product12.jpg", type: "accessories" },
    { id: 9, name: "Organic Dry Shampoo", price: 21.99, image: "/src/assets/products/product1.webp", type: "shampoo" },
    { id: 10, name: "Vegan Heat Protectant", price: 23.99, image: "/src/assets/products/product2.webp", type: "styling" },
    { id: 11, name: "Zero-waste Hair Oil", price: 31.99, image: "/src/assets/products/product3.webp", type: "treatment" },
    { id: 12, name: "Biodegradable Hair Gel", price: 17.99, image: "/src/assets/products/product4.jpg", type: "styling" },
    { id: 13, name: "Plastic-free Hair Wax", price: 20.99, image: "/src/assets/testing4.png", type: "styling" },
    { id: 14, name: "Sustainable Hair Pomade", price: 22.99, image: "/src/assets/testing5.png", type: "styling" },
  ],
  makeup: [
    { id: 1, name: "Vegan Foundation", price: 38.99, image: "/src/assets/products/product9.jpg", type: "face" },
    { id: 2, name: "Cruelty-free Lipstick", price: 24.99, image: "/src/assets/products/product10.avif", type: "lips" },
    { id: 3, name: "Organic Mascara", price: 29.99, image: "/src/assets/products/product11.jpg", type: "eyes" },
    { id: 4, name: "Natural Eye Shadow Palette", price: 45.99, image: "/src/assets/products/product12.jpg", type: "eyes" },
    { id: 5, name: "Clean Beauty Blush", price: 27.99, image: "/src/assets/products/product1.webp", type: "face" },
    { id: 6, name: "Sustainable Concealer", price: 32.99, image: "/src/assets/products/product2.webp", type: "face" },
    { id: 7, name: "Refillable Bronzer", price: 34.99, image: "/src/assets/products/product3.webp", type: "face" },
    { id: 8, name: "Zero-waste Highlighter", price: 28.99, image: "/src/assets/products/product4.jpg", type: "face" },
    { id: 9, name: "Eco-friendly Eyeliner", price: 22.99, image: "/src/assets/products/product5.webp", type: "eyes" },
    { id: 10, name: "Biodegradable Eyebrow Pencil", price: 19.99, image: "/src/assets/products/product6.webp", type: "eyes" },
    { id: 11, name: "Plastic-free Setting Powder", price: 36.99, image: "/src/assets/products/product7.webp", type: "face" },
    { id: 12, name: "Plant-based Makeup Remover", price: 21.99, image: "/src/assets/products/product8.webp", type: "face" },
    { id: 13, name: "Sustainable Makeup Brushes Set", price: 59.99, image: "/src/assets/testing6.png", type: "brushes" },
    { id: 14, name: "Eco-conscious Makeup Sponges", price: 18.99, image: "/src/assets/testing7.png", type: "brushes" },
  ],
  "skin-care": [
    { id: 1, name: "Organic Facial Cleanser", price: 28.99, image: "/src/assets/products/product1.webp", type: "cleanser" },
    { id: 2, name: "Natural Face Moisturizer", price: 34.99, image: "/src/assets/products/product2.webp", type: "moisturizer" },
    { id: 3, name: "Vegan Face Serum", price: 42.99, image: "/src/assets/products/product3.webp", type: "serum" },
    { id: 4, name: "Cruelty-free Eye Cream", price: 38.99, image: "/src/assets/products/product4.jpg", type: "moisturizer" },
    { id: 5, name: "Clean Beauty Face Mask", price: 31.99, image: "/src/assets/products/product5.webp", type: "mask" },
    { id: 6, name: "Sustainable Toner", price: 26.99, image: "/src/assets/products/product6.webp", type: "cleanser" },
    { id: 7, name: "Eco-friendly Sunscreen", price: 29.99, image: "/src/assets/products/product7.webp", type: "sunscreen" },
    { id: 8, name: "Zero-waste Face Scrub", price: 27.99, image: "/src/assets/products/product8.webp", type: "cleanser" },
    { id: 9, name: "Biodegradable Face Wipes", price: 15.99, image: "/src/assets/products/product9.jpg", type: "cleanser" },
    { id: 10, name: "Plant-based Lip Balm", price: 12.99, image: "/src/assets/products/product10.avif", type: "moisturizer" },
    { id: 11, name: "Plastic-free Body Lotion", price: 32.99, image: "/src/assets/products/product11.jpg", type: "moisturizer" },
    { id: 12, name: "Organic Hand Cream", price: 18.99, image: "/src/assets/products/product12.jpg", type: "moisturizer" },
    { id: 13, name: "Natural Facial Oil", price: 39.99, image: "/src/assets/testing.png", type: "serum" },
    { id: 14, name: "Sustainable Sheet Masks Set", price: 24.99, image: "/src/assets/testing2.png", type: "mask" },
    { id: 15, name: "Eco-conscious Facial Roller", price: 45.99, image: "/src/assets/testing3.png", type: "accessories" },
    { id: 16, name: "Zero-waste Night Cream", price: 36.99, image: "/src/assets/testing4.png", type: "moisturizer" },
  ]
};

// map slug → pretty
const getCategoryTitle = (slug) => ({
  clothing:   "Clothing",
  hair:       "Hair",
  makeup:     "Makeup",
  "skin-care":"Skin Care",
}[slug] || slug.charAt(0).toUpperCase() + slug.slice(1));


function ProductCategoryPage() {
  const { category } = useParams();
  const [products, setProducts]           = useState([]);
  const [filteredProducts, setFiltered]   = useState([]);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  // for mobile filter panel
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterRef = useRef();

  // load & reset on category change
  useEffect(() => {
    window.scrollTo(0,0);
    const list = productsByCategory[category] || [];
    setProducts(list);
    setFiltered(list);
  }, [category]);

  // handle filter changes
  const handleFilterChange = useCallback((filters) => {
    let result = [...products];
    // --- sort ---
    if (filters.sort !== "Recommended") {
      switch(filters.sort) {
        case "Price: Low to High":  result.sort((a,b)=>a.price-b.price); break;
        case "Price: High to Low":  result.sort((a,b)=>b.price-a.price); break;
        case "Name: A to Z":        result.sort((a,b)=>a.name.localeCompare(b.name)); break;
        case "Name: Z to A":        result.sort((a,b)=>b.name.localeCompare(a.name)); break;
      }
    }
    // --- price range ---
    if (filters.priceRange !== "All Prices") {
      const p = filters.priceRange;
      if (p === "Under $25")      result = result.filter(p=>p.price<25);
      else if (p === "$ 25 - $ 50") result = result.filter(p=>p.price>=25 && p.price<=50);
      else if (p === "$ 50 - $ 100")result = result.filter(p=>p.price>50  && p.price<=100);
      else if (p === "Over $ 100") result = result.filter(p=>p.price>100);
    }
    // --- type ---
    if (filters.type !== "All Types") {
      const tVal = filters.type.toLowerCase().replace(/\s+/g,'-');
      result = result.filter(p=>p.type===tVal);
    }
    // --- size (only clothing) ---
    if (category==="clothing" && filters.size!=="All Sizes") {
      const sz = filters.size.toLowerCase();
      result = result.filter(p=>Array.isArray(p.size) && p.size.includes(sz));
    }

    setFiltered(result);
  }, [products, category]);

  // toggle mobile filter panel
  const toggleFilterMenu = () => setShowFilterMenu(v=>!v);

  // close on outside click
  useEffect(() => {
    function onClick(e) {
      if (filterRef.current && !filterRef.current.contains(e.target)
          && !e.target.closest('[data-filter-toggle]')) {
        setShowFilterMenu(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* 1) Title */}
      <motion.h1
        initial={{ opacity:0, y:-20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.6 }}
        className="pt-10 text-4xl font-bold font-bodoni mb-8 text-center"
      >
        {getCategoryTitle(category)}
      </motion.h1>

      {/* 2) Mobile filter button */}
      <div className="fixed top-20 right-4 z-40 md:hidden">
        <button
          onClick={toggleFilterMenu}
          data-filter-toggle
          className="bg-black text-white p-3 rounded-full shadow-lg border-2 border-white hover:bg-white hover:text-black hover:border-black transition duration-300 cursor-pointer"
        >
          <FaFilter className="h-5 w-5" />
        </button>
      </div>

      {/* 3) Desktop filter always visible */}
      <div className="hidden md:block mb-8">
        <ProductFilter
          category={category}
          onFilterChange={handleFilterChange}
          isMobile={false}
        />
      </div>

      {/* 4) Mobile overlay */}
      <div
        onClick={toggleFilterMenu}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden
                    transition-opacity duration-300
                    ${showFilterMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      />

      {/* 5) Mobile slide-in panel */}
      <div
        ref={filterRef}
        className={`fixed top-0 right-0 w-3/4 h-full bg-white z-50 shadow-xl transform transition-transform duration-300
                    ${showFilterMenu ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Filters</h3>
            <button
              onClick={toggleFilterMenu}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
          <ProductFilter
            category={category}
            onFilterChange={handleFilterChange}
            isMobile={true}
            onClose={toggleFilterMenu}
          />
        </div>
      </div>

      {/* 6) Product grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No products found matching your filters.</p>
          <p className="mt-2 text-gray-500">Try adjusting your filter criteria.</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ duration:0.6, delay:0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6"
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ duration:0.5, delay: idx * 0.05 }}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 group cursor-pointer flex flex-col h-[420px] sm:h-[480px] md:h-[520px]"
            >
              <div className="relative overflow-hidden h-48 sm:h-64 md:h-72 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>
              <div className="p-3 sm:p-4 flex flex-col flex-1 min-h-0">
                <h3 className="font-poppins text-sm sm:text-base md:text-lg font-medium mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-700 font-semibold mb-2">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex justify-between text-gray-500 text-sm mt-1 mb-2">
                  <span className="capitalize">
                    {category.replace("-", " ")}
                  </span>
                  {product.type && (
                    <span className="capitalize">{product.type.replace("-", " ")}</span>
                  )}
                </div>
                {category === "clothing" && product.size && (
                  <p className="text-gray-500 text-xs mb-2">
                    Sizes: {product.size.map((s) => s.toUpperCase()).join(", ")}
                  </p>
                )}
                {cart[`${category}-${product.id}`] > 0 ? (
                  <div className="mt-auto flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 text-xs sm:text-sm font-medium">
                        Added to cart
                      </span>
                      <span className="text-xs sm:text-sm font-medium">
                        ${(product.price * cart[`${category}-${product.id}`]).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-1">
                      <button 
                        onClick={() => decreaseQuantity(product.id, category)}
                        className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-l border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        –
                      </button>
                      <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white font-medium">
                        {cart[`${category}-${product.id}`]}
                      </span>
                      <button 
                        onClick={() => increaseQuantity(product.id, category)}
                        className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-r border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product.id, category)}
                    className="mt-auto w-full bg-black text-white text-xs sm:text-sm py-2 px-4 rounded border border-black hover:bg-white hover:text-black transition cursor-pointer"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

export default ProductCategoryPage;
