import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaTimes } from "react-icons/fa";

// Unified dropdown that knows desktop vs. mobile
function FilterDropdown({ label, options, value, onChange, isMobile }) {
  const [isOpen, setIsOpen] = useState(false);

  // Mobile: accordion style
  if (isMobile) {
    return (
      <div className="mb-3 border border-gray-200 rounded-md overflow-hidden">
        <button
          className="flex items-center justify-between w-full px-4 py-3 bg-white text-left font-medium text-gray-800 hover:bg-gray-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>
            <span className="block text-sm font-semibold">{label}</span>
            <span className="text-xs text-gray-500 mt-0.5">{value}</span>
          </div>
          {isOpen ? <FaChevronUp className="h-3.5 w-3.5 text-gray-500" /> : <FaChevronDown className="h-3.5 w-3.5 text-gray-500" />}
        </button>
        {isOpen && (
          <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {options.map(opt => (
                <button
                  key={opt.value}
                  className={`px-3 py-1.5 rounded-full text-xs ${
                    value === opt.label
                      ? "bg-black text-white"
                      : "bg-white border border-gray-300 text-gray-700"
                  }`}
                  onClick={() => onChange(opt.value, opt.label)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Desktop: pop-down
  return (
    <div className="relative">
      <button
        className="flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {label}: {value}
        </span>
        <FaChevronDown className="w-4 h-4 ml-2" />
      </button>
      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-sm ring-1 ring-black ring-opacity-5 overflow-auto max-h-60"
          style={{ minWidth: "150px" }}
        >
          {options.map(opt => (
            <div
              key={opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                value === opt.label ? "bg-gray-100" : ""
              }`}
              onClick={() => {
                onChange(opt.value, opt.label);
                setIsOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductFilter({
  category,
  onFilterChange,
  isMobile = false,
  onClose,      // optional: called after mobile “Apply”
}) {
  // default state
  const [filters, setFilters] = useState({
    sort:       "Recommended",
    priceRange: "All Prices",
    size:       "All Sizes",
    type:       "All Types",
  });

  // sort options
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "price-low",   label: "Price: Low to High" },
    { value: "price-high",  label: "Price: High to Low" },
    { value: "name-asc",    label: "Name: A to Z" },
    { value: "name-desc",   label: "Name: Z to A" },
  ];

  // price ranges
  const priceRangeOptions = [
    { value: "all",      label: "All Prices" },
    { value: "under25",  label: "Under $25" },
    { value: "25to50",   label: "$ 25 - $ 50" },
    { value: "50to100",  label: "$ 50 - $ 100" },
    { value: "over100",  label: "Over $ 100" },
  ];

  // per-category type/size lists
  const categorySpec = (() => {
    switch (category) {
      case "clothing":
        return {
          sizes: [
            { value: "all", label: "All Sizes" },
            { value: "xs",  label: "XS" },
            { value: "s",   label: "S" },
            { value: "m",   label: "M" },
            { value: "l",   label: "L" },
            { value: "xl",  label: "XL" },
          ],
          types: [
            { value: "all",       label: "All Types" },
            { value: "dresses",   label: "Dresses" },
            { value: "tops",      label: "Tops" },
            { value: "bottoms",   label: "Bottoms" },
            { value: "outerwear", label: "Outerwear" },
          ],
        };
      case "makeup":
        return {
          types: [
            { value: "all",    label: "All Types" },
            { value: "face",   label: "Face" },
            { value: "eyes",   label: "Eyes" },
            { value: "lips",   label: "Lips" },
            { value: "brushes",label: "Brushes" },
          ],
        };
      case "hair":
        return {
          types: [
            { value: "all",         label: "All Types" },
            { value: "shampoo",     label: "Shampoo" },
            { value: "conditioner", label: "Conditioner" },
            { value: "styling",     label: "Styling" },
            { value: "treatment",   label: "Treatment" },
            { value: "accessories", label: "Accessories" },
          ],
        };
      case "skin-care":
        return {
          types: [
            { value: "all",       label: "All Types" },
            { value: "cleanser",  label: "Cleanser" },
            { value: "moisturizer",label:"Moisturizer" },
            { value: "serum",     label: "Serum" },
            { value: "mask",      label: "Mask" },
            { value: "sunscreen", label: "Sunscreen" },
          ],
        };
      default:
        return { types: [{ value: "all", label: "All Types" }] };
    }
  })();

  // notify parent whenever filters change
  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const changeFilter = (key, _val, label) => {
    setFilters(f => ({ ...f, [key]: label }));
  };

  // clear all
  const clearAll = () => {
    setFilters({
      sort:       "Recommended",
      priceRange: "All Prices",
      size:       "All Sizes",
      type:       "All Types",
    });
  };

  return (
    <motion.div
      initial={{ opacity:0, y:-10 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:0.3 }}
      className={`${isMobile ? "p-0 bg-transparent" : "p-4 bg-gray-50 rounded-lg shadow-sm"} mb-8`}
    >
      {!isMobile && <h2 className="text-lg font-semibold mb-4">Filter Products</h2>}

      {/* Dropdown grid (desktop) or stacked (mobile) */}
      <div className={isMobile ? "" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"}>
        <FilterDropdown
          label="Sort By"
          options={sortOptions}
          value={filters.sort}
          onChange={(v,l) => changeFilter("sort", v, l)}
          isMobile={isMobile}
        />
        <FilterDropdown
          label="Price"
          options={priceRangeOptions}
          value={filters.priceRange}
          onChange={(v,l) => changeFilter("priceRange", v, l)}
          isMobile={isMobile}
        />
        {category === "clothing" && (
          <FilterDropdown
            label="Size"
            options={categorySpec.sizes}
            value={filters.size}
            onChange={(v,l) => changeFilter("size", v, l)}
            isMobile={isMobile}
          />
        )}
        <FilterDropdown
          label="Type"
          options={categorySpec.types}
          value={filters.type}
          onChange={(v,l) => changeFilter("type", v, l)}
          isMobile={isMobile}
        />
      </div>

      {/* Active tags + clear (desktop always, mobile when any filter) */}
      {(!isMobile || Object.values(filters).some(v =>
        !["Recommended","All Prices","All Sizes","All Types"].includes(v)
      )) && (
        <div className={`${isMobile ? "mt-4 px-2" : "mt-4"} flex flex-wrap gap-2`}>
          {Object.entries(filters).map(([k, v]) => {
            const isDefault =
              (k==="sort"       && v==="Recommended") ||
              (k==="priceRange" && v==="All Prices") ||
              (k==="size"       && v==="All Sizes") ||
              (k==="type"       && v==="All Types");
            if (isDefault) return null;
            return (
              <div key={k} className="bg-black text-white text-xs px-3 py-1.5 rounded-full flex items-center">
                {v}
                <button
                  onClick={() => {
                    const def = k==="sort"       ? "Recommended"
                              : k==="priceRange" ? "All Prices"
                              : k==="size"       ? "All Sizes"
                              :                    "All Types";
                    changeFilter(k, k==="sort" ? "recommended" : "all", def);
                  }}
                  className="ml-2"
                  aria-label={`Remove ${v} filter`}
                >
                  <FaTimes className="w-3 h-3"/>
                </button>
              </div>
            );
          })}
          {Object.values(filters).some(v =>
            !["Recommended","All Prices","All Sizes","All Types"].includes(v)
          ) && (
            <button
              onClick={clearAll}
              className="text-xs px-3 py-1.5 border border-gray-300 rounded-full hover:bg-gray-100"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Mobile “Apply” button */}
      {isMobile && onClose && (
        <div className="px-2 pt-3 pb-2">
          <button
            onClick={onClose}
            className="w-full bg-black text-white text-sm py-2.5 rounded font-medium"
          >
            Apply Filters
          </button>
        </div>
      )}
    </motion.div>
  );
}
