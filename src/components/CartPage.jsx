import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
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

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  
  useEffect(() => {
    // Fetch all products that are in the cart
    const items = [];
    let total = 0;

    Object.entries(cart).forEach(([key, quantity]) => {
      if (quantity > 0) {
        const [categoryName, productId] = key.split('-');
        const numericProductId = parseInt(productId, 10);
        
        // Find the product in the category
        const product = productsByCategory[categoryName]?.find(p => p.id === numericProductId);
        
        if (product) {
          const item = {
            ...product,
            category: categoryName,
            quantity,
            totalPrice: product.price * quantity,
            image: getCorrectImagePath(product.image)
          };
          
          items.push(item);
          total += item.totalPrice;
        }
      }
    });
    
    setCartItems(items);
    setTotalPrice(total);
  }, [cart]);

  return (
    <div className="container mx-auto px-4 py-12 mt-12">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold font-bodoni mb-8 text-center"
      >
        Shopping Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Link 
            to="/products" 
            className="inline-block font-bodoni px-6 py-3 bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md">
              <table className="w-full">
                <thead className="border-b">
                  <tr className="text-left">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Quantity</th>
                    <th className="py-4 px-6">Total</th>
                    <th className="py-4 px-6"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={`${item.category}-${item.id}`} className="border-b">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover mr-4"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">{item.category.replace('-', ' ')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center border rounded-md max-w-[120px]">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.category)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100"
                          >
                            -
                          </button>
                          <span className="mx-3 font-medium">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item.id, item.category)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold">${item.totalPrice.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => removeFromCart(item.id, item.category)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          ✕
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="p-6 flex justify-between items-center">
                <Link 
                  to="/products" 
                  className="font-medium text-black hover:underline"
                >
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="font-medium text-red-600 hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="border-t border-b py-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold text-lg mb-6">
                <span>Total</span>
                <span>${(totalPrice + (totalPrice * 0.08)).toFixed(2)}</span>
              </div>
              
              <button className="w-full bg-black text-white py-3 rounded hover:opacity-90 transition-opacity">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;