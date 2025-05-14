import { motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ProductFilter from "./ProductFilter";

// Import the product data from ProductCategoryPage
import { productsByCategory } from "./ProductCategoryPage";

// Import product images
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

// Helper function to get all products from all categories
const getAllProducts = () => {
  const allProducts = [];
  
  Object.entries(productsByCategory).forEach(([category, products]) => {
    products.forEach(product => {
      allProducts.push({
        ...product,
        category,
        // Fix the image path by using the imported image references when possible
        image: getCorrectImagePath(product.image)
      });
    });
  });
  
  return allProducts;
};

// Helper function to get the correct image path
const getCorrectImagePath = (imagePath) => {
  const imageName = imagePath.split('/').pop();
  
  // Map of image names to import references
  const imageMap = {
    'product1.webp': Product1,
    'product2.webp': Product2,
    'product3.webp': Product3,
    'product4.jpg': Product4,
    'product5.webp': Product5,
    'product6.webp': Product6,
    'product7.webp': Product7,
    'product8.webp': Product8,
    'product9.jpg': Product9,
    'product10.avif': Product10,
    'product11.jpg': Product11,
    'product12.jpg': Product12
  };
  
  return imageMap[imageName] || imagePath;
};

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  
  // Filter categories
  const categories = [
    { id: "all", name: "All Products" },
    { id: "clothing", name: "Clothing" },
    { id: "hair", name: "Hair" },
    { id: "skin-care", name: "Skin Care" },
    { id: "makeup", name: "Makeup" }
  ];

  // Initialize products on component mount
  useEffect(() => {
    const allProducts = getAllProducts();
    setProducts(allProducts);
    setFilteredProducts(allProducts);
  }, []);

  // Filter products based on selected category
  useEffect(() => {
    const allProducts = getAllProducts();
    if (activeFilter === "all") {
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } else {
      const categoryProducts = allProducts.filter(product => product.category === activeFilter);
      setProducts(categoryProducts);
      setFilteredProducts(categoryProducts);
    }
  }, [activeFilter]);

  // Handle filter changes
  const handleFilterChange = useCallback((filters) => {
    let result = [...products];
    
    // Sort products
    if (filters.sort !== "Recommended") {
      switch(filters.sort) {
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
        default:
          // Keep default order for "Recommended"
          break;
      }
    }
    
    // Filter by price range
    if (filters.priceRange !== "All Prices") {
      switch(filters.priceRange) {
        case "Under $25":
          result = result.filter(p => p.price < 25);
          break;
        case "$ 25 - $ 50":
          result = result.filter(p => p.price >= 25 && p.price <= 50);
          break;
        case "$ 50 - $ 100":
          result = result.filter(p => p.price > 50 && p.price <= 100);
          break;
        case "Over $ 100":
          result = result.filter(p => p.price > 100);
          break;
        default:
          break;
      }
    }
    
    // Filter by product type - only if we have a specific category selected
    if (activeFilter !== "all" && filters.type !== "All Types") {
      const typeValue = filters.type.toLowerCase().replace(/\s+/g, '-');
      result = result.filter(p => p.type === typeValue);
    }
    
    // Filter by size (clothing only)
    if ((activeFilter === 'clothing' || (activeFilter === 'all' && filters.size !== "All Sizes"))) {
      const sizeValue = filters.size.toLowerCase();
      result = result.filter(p => {
        // Only filter clothing products by size
        if (p.category !== 'clothing') return true;
        return p.size && p.size.includes(sizeValue);
      });
    }
    
    setFilteredProducts(result);
  }, [products, activeFilter]);

  return (
    <div className="mt-24 px-10 py-8">
      <h1 className="text-4xl font-bold font-bodoni mb-8 text-center">
        All Products
      </h1>
      
      {/* Category filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              activeFilter === category.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
            onClick={() => setActiveFilter(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Product filters */}
      <ProductFilter category={activeFilter} onFilterChange={handleFilterChange} />
      
      {/* Products grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-xl text-gray-600">No products found matching your filters.</p>
          <p className="mt-2 text-gray-500">Try adjusting your filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <motion.div
              key={`${product.category}-${product.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-60 object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>
              <div className="p-4">
                <h3 className="font-poppins text-lg font-medium mb-1 line-clamp-2">{product.name}</h3>
                <p className="text-gray-700 font-semibold">${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
                <div className="flex flex-wrap justify-between mt-1 mb-2">
                  <p className="text-gray-500 text-sm capitalize">
                    {product.category.replace('-', ' ')}
                  </p>
                  {product.type && (
                    <p className="text-gray-500 text-sm capitalize">
                      {product.type.replace('-', ' ')}
                    </p>
                  )}
                </div>
                
                {/* Show sizes for clothing products */}
                {product.category === 'clothing' && product.size && (
                  <p className="text-gray-500 text-xs mb-2">
                    Sizes: {product.size.map(s => s.toUpperCase()).join(', ')}
                  </p>
                )}
                
                {cart[`${product.category}-${product.id}`] > 0 ? (
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-medium">Added to cart</span>
                      <span className="font-medium">${(product.price * cart[`${product.category}-${product.id}`]).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-1">
                      <button 
                        onClick={() => decreaseQuantity(product.id, product.category)} 
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="font-medium">{cart[`${product.category}-${product.id}`]}</span>
                      <button 
                        onClick={() => increaseQuantity(product.id, product.category)} 
                        className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  <button 
                    onClick={() => addToCart(product.id, product.category)} 
                    className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 mt-2"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;