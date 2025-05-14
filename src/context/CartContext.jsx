import { createContext, useState, useContext, useEffect } from 'react';

// Create the cart context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('dapprCart');
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // Calculate total items in cart
  const totalItems = Object.values(cart).reduce((acc, quantity) => acc + quantity, 0);

  // Calculate total price (needs to access product data)
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('dapprCart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (productId, category) => {
    setCart(prevCart => ({
      ...prevCart,
      [`${category}-${productId}`]: (prevCart[`${category}-${productId}`] || 0) + 1
    }));
  };

  // Increase quantity
  const increaseQuantity = (productId, category) => {
    setCart(prevCart => ({
      ...prevCart,
      [`${category}-${productId}`]: (prevCart[`${category}-${productId}`] || 0) + 1
    }));
  };

  // Decrease quantity
  const decreaseQuantity = (productId, category) => {
    if (cart[`${category}-${productId}`] > 0) {
      setCart(prevCart => ({
        ...prevCart,
        [`${category}-${productId}`]: prevCart[`${category}-${productId}`] - 1
      }));
    }
  };

  // Remove item from cart
  const removeFromCart = (productId, category) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[`${category}-${productId}`];
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart({});
  };

  // Calculate cart total based on product data
  const calculateTotal = (products) => {
    let total = 0;
    
    Object.entries(cart).forEach(([key, quantity]) => {
      const [category, productId] = key.split('-');
      const productIdNumber = parseInt(productId, 10);
      
      // Find the product in the products object
      const product = products.find(p => 
        p.id === productIdNumber && p.category === category
      );
      
      if (product) {
        total += product.price * quantity;
      }
    });
    
    setTotalPrice(total);
    return total;
  };

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
      calculateTotal
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