import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
import { motion } from 'framer-motion';
import { productsByCategory } from './ProductCategoryPage';

// Helper function to get all products from all categories
const getAllProducts = () => {
  const allProducts = [];
  
  Object.entries(productsByCategory).forEach(([category, products]) => {
    products.forEach(product => {
      allProducts.push({
        ...product,
        category
      });
    });
  });
  
  return allProducts;
};

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Load all products on initial render
  useEffect(() => {
    const products = getAllProducts();
    setAllProducts(products);
    setLoading(false);
  }, []);
  
  // Perform search when query or products change
  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    const lowerCaseQuery = query.toLowerCase();
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(lowerCaseQuery) || 
      product.description?.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery)
    );
    
    setSearchResults(results);
  }, [query, allProducts]);
  
  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: searchQuery });
  };
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="mt-16 md:mt-24 mb-16 px-4 md:px-6 max-w-6xl mx-auto">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl font-bold font-bodoni mb-6 md:mb-8 text-center md:text-left"
      >
        Search Products
      </motion.h1>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-6 md:mb-8">
        <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 py-2 md:py-3 px-3 md:px-4 outline-none text-sm md:text-base"
          />
          <button 
            type="submit"
            className="bg-black text-white p-2 md:p-3"
            aria-label="Search"
          >
            <HiOutlineSearch className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </form>
      
      {/* Search results */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <div>
          {query && (
            <p className="mb-4 text-sm md:text-base text-gray-600 text-center md:text-left">
              {searchResults.length === 0 
                ? 'No products found' 
                : `Found ${searchResults.length} product${searchResults.length === 1 ? '' : 's'} for "${query}"`}
            </p>
          )}
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, staggerChildren: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6"
          >
            {searchResults.map((product) => (
              <motion.div 
                key={`${product.category}-${product.id}`} 
                variants={fadeInUp}
                className="group border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}?product=${product.id}`}>
                  <div className="h-40 md:h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 md:p-4">
                    <p className="text-xs md:text-sm text-gray-500 mb-1 capitalize">
                      {product.category.replace('-', ' ')}
                    </p>
                    <h3 className="font-medium text-sm md:text-base line-clamp-2">{product.name}</h3>
                    <p className="mt-1 md:mt-2 font-bold text-sm md:text-base">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          {query && searchResults.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center py-6 md:py-8"
            >
              <p className="text-base md:text-lg text-gray-600 mb-3 md:mb-4">No products match your search criteria.</p>
              <p className="text-sm md:text-base text-gray-500">Try different keywords or browse our categories.</p>
              <div className="mt-5 md:mt-6">
                <Link 
                  to="/products"
                  className="bg-black text-white px-5 py-2 md:px-6 md:py-3 text-sm md:text-base rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300"
                >
                  Browse All Products
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;