import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { HiOutlineSearch } from 'react-icons/hi';
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
  
  return (
    <div className="mt-24 mb-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold font-bodoni mb-8">Search Products</h1>
      
      {/* Search form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex items-center border-2 border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="flex-1 py-3 px-4 outline-none"
          />
          <button 
            type="submit"
            className="bg-black text-white p-3"
          >
            <HiOutlineSearch className="w-6 h-6" />
          </button>
        </div>
      </form>
      
      {/* Search results */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      ) : (
        <div>
          {query && (
            <p className="mb-4 text-gray-600">
              {searchResults.length === 0 
                ? 'No products found' 
                : `Found ${searchResults.length} product${searchResults.length === 1 ? '' : 's'} for "${query}"`}
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((product) => (
              <div key={`${product.category}-${product.id}`} className="group border border-gray-200 rounded-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/category/${product.category.toLowerCase().replace(/\s+/g, '-')}?product=${product.id}`}>
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{product.category}</p>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          
          {query && searchResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 mb-4">No products match your search criteria.</p>
              <p className="text-gray-500">Try different keywords or browse our categories.</p>
              <div className="mt-6">
                <Link 
                  to="/products"
                  className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
                >
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage; 