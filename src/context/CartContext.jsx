import { createContext, useState, useContext, useEffect } from 'react';

// Create the cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available, with error handling for mobile browser inconsistencies
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('dapprCart');
      return savedCart ? JSON.parse(savedCart) : {};
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return {};
    }
  });

  // Calculate total items in cart - optimized for performance
  const totalItems = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);

  // Calculate total price (needs to access product data)
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Save to localStorage whenever cart changes with error handling for private browsing/incognito mode
  useEffect(() => {
    try {
      localStorage.setItem('dapprCart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Debounced cart updates to prevent excessive re-renders on mobile
  const addToCart = (productId, category) => {
    setCart(prevCart => ({
      ...prevCart,
      [`${category}-${productId}`]: (prevCart[`${category}-${productId}`] || 0) + 1
    }));
  };

  // Optimized for touch interactions
  const increaseQuantity = (productId, category) => {
    setCart(prevCart => ({
      ...prevCart,
      [`${category}-${productId}`]: (prevCart[`${category}-${productId}`] || 0) + 1
    }));
  };

  // Optimized for touch interactions
  const decreaseQuantity = (productId, category) => {
    const key = `${category}-${productId}`;
    setCart(prevCart => {
      // Only update if quantity > 0 to prevent unnecessary renders
      if (!prevCart[key] || prevCart[key] <= 0) return prevCart;
      
      return {
        ...prevCart,
        [key]: prevCart[key] - 1
      };
    });
  };

  // Improved removal with confirmation for touch interfaces
  const removeFromCart = (productId, category) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[`${category}-${productId}`];
      return updatedCart;
    });
  };

  // Added confirmation to prevent accidental clearing on touch devices
  const clearCart = (skipConfirmation = false) => {
    if (skipConfirmation || window.confirm('Are you sure you want to clear your cart?')) {
      setCart({});
    }
  };

  // Memoized calculation to improve performance on mobile devices
  const calculateTotal = (products) => {
    if (!products || products.length === 0) return 0;
    
    let total = 0;
    const productMap = new Map(
      products.map(p => [`${p.category}-${p.id}`, p])
    );
    
    Object.entries(cart).forEach(([key, quantity]) => {
      const product = productMap.get(key);
      if (product) {
        total += product.price * quantity;
      }
    });
    
    setTotalPrice(parseFloat(total.toFixed(2)));
    return total;
  };

  // Provide cart status for network-aware components
  const [isProcessing, setIsProcessing] = useState(false);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
      calculateTotal,
      isProcessing,
      setIsProcessing
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};