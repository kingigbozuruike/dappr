import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Common dropdown component for all filters
function FilterDropdown({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button 
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{label}: {value}</span>
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div 
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
          style={{ minWidth: '150px' }}
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${value === option.label ? 'bg-gray-100' : ''}`}
              onClick={() => {
                onChange(option.value, option.label);
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductFilter({ category, onFilterChange }) {
  // Common sort options for all categories
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" }
  ];
  
  // Initialize state with default values
  const [filters, setFilters] = useState({
    sort: "Recommended",
    priceRange: "All Prices",
    size: "All Sizes", // For clothing only
    type: "All Types"  // Category-specific filter
  });
  
  // Category-specific filters
  const getCategorySpecificFilters = () => {
    switch(category) {
      case 'clothing':
        return {
          sizes: [
            { value: "all", label: "All Sizes" },
            { value: "xs", label: "XS" },
            { value: "s", label: "S" },
            { value: "m", label: "M" },
            { value: "l", label: "L" },
            { value: "xl", label: "XL" }
          ],
          types: [
            { value: "all", label: "All Types" },
            { value: "dresses", label: "Dresses" },
            { value: "tops", label: "Tops" },
            { value: "bottoms", label: "Bottoms" },
            { value: "outerwear", label: "Outerwear" }
          ]
        };
      case 'makeup':
        return {
          types: [
            { value: "all", label: "All Types" },
            { value: "face", label: "Face" },
            { value: "eyes", label: "Eyes" },
            { value: "lips", label: "Lips" },
            { value: "brushes", label: "Brushes" }
          ]
        };
      case 'hair':
        return {
          types: [
            { value: "all", label: "All Types" },
            { value: "shampoo", label: "Shampoo" },
            { value: "conditioner", label: "Conditioner" },
            { value: "styling", label: "Styling" },
            { value: "treatment", label: "Treatment" },
            { value: "accessories", label: "Accessories" }
          ]
        };
      case 'skin-care':
        return {
          types: [
            { value: "all", label: "All Types" },
            { value: "cleanser", label: "Cleanser" },
            { value: "moisturizer", label: "Moisturizer" },
            { value: "serum", label: "Serum" },
            { value: "mask", label: "Mask" },
            { value: "sunscreen", label: "Sunscreen" }
          ]
        };
      default:
        return {
          types: [
            { value: "all", label: "All Types" }
          ]
        };
    }
  };
  
  // Price range options
  const priceRangeOptions = [
    { value: "all", label: "All Prices" },
    { value: "under25", label: "Under $25" },
    { value: "25to50", label: "$ 25 - $ 50" },
    { value: "50to100", label: "$ 50 - $ 100" },
    { value: "over100", label: "Over $ 100" }
  ];
  
  const categoryFilters = getCategorySpecificFilters();
  
  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);
  
  // Handle filter changes
  const handleFilterChange = (filterType, value, label) => {
    setFilters({ ...filters, [filterType]: label });
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 p-4 bg-gray-50 rounded-lg shadow-sm"
    >
      <h2 className="text-lg font-semibold mb-4">Filter Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Sort Filter */}
        <FilterDropdown 
          label="Sort By"
          options={sortOptions}
          value={filters.sort}
          onChange={(value, label) => handleFilterChange('sort', value, label)}
        />
        
        {/* Price Range Filter */}
        <FilterDropdown 
          label="Price"
          options={priceRangeOptions}
          value={filters.priceRange}
          onChange={(value, label) => handleFilterChange('priceRange', value, label)}
        />
        
        {/* Size Filter - Only for clothing */}
        {category === 'clothing' && (
          <FilterDropdown 
            label="Size"
            options={categoryFilters.sizes}
            value={filters.size}
            onChange={(value, label) => handleFilterChange('size', value, label)}
          />
        )}
        
        {/* Category-specific Filter */}
        <FilterDropdown 
          label="Type"
          options={categoryFilters.types}
          value={filters.type}
          onChange={(value, label) => handleFilterChange('type', value, label)}
        />
      </div>
      
      {/* Active Filters */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(filters).map(([key, value]) => {
          // Skip default filter values
          if (value === "Recommended" && key === "sort") return null;
          if (value === "All Prices" && key === "priceRange") return null;
          if (value === "All Sizes" && key === "size") return null;
          if (value === "All Types" && key === "type") return null;
          
          return (
            <div 
              key={key} 
              className="bg-black text-white text-sm px-3 py-1 rounded-full flex items-center"
            >
              {value}
              <button 
                onClick={() => {
                  const defaultValue = 
                    key === "sort" ? "Recommended" :
                    key === "priceRange" ? "All Prices" :
                    key === "size" ? "All Sizes" :
                    "All Types";
                  
                  handleFilterChange(key, key === "sort" ? "recommended" : "all", defaultValue);
                }}
                className="ml-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProductFilter;