import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productsByCategory } from "./ProductCategoryPage";
import { FaTrash } from "react-icons/fa";

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

// Map image filename to import
const getCorrectImagePath = (imagePath) => {
  const imageName = imagePath.split("/").pop();
  const imageMap = {
    'product1.webp': Product1,
    'product2.webp': Product2,
    'product3.webp': Product3,
    'product4.jpg':  Product4,
    'product5.webp': Product5,
    'product6.webp': Product6,
    'product7.webp': Product7,
    'product8.webp': Product8,
    'product9.jpg':  Product9,
    'product10.avif': Product10,
    'product11.jpg': Product11,
    'product12.jpg': Product12
  };
  return imageMap[imageName] || imagePath;
};

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Build cart items and total
  useEffect(() => {
    const items = [];
    let total = 0;

    Object.entries(cart).forEach(([key, qty]) => {
      if (qty > 0) {
        const [categoryName, productId] = key.split("-");
        const prodId = parseInt(productId, 10);
        const product = productsByCategory[categoryName]?.find(p => p.id === prodId);
        if (product) {
          const item = {
            ...product,
            category: categoryName,
            quantity: qty,
            totalPrice: product.price * qty,
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
    <div className="container mx-auto px-4 py-8 sm:py-12 mt-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold font-bodoni mb-6 sm:mb-8 text-center"
      >
        Shopping Cart
      </motion.h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <p className="text-lg sm:text-xl mb-6">Your cart is empty</p>
          <Link
            to="/products"
            className="font-poppins px-6 py-3 bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">

          {/* Desktop Table */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full hidden md:table">
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
                  {cartItems.map(item => (
                    <tr key={`${item.category}-${item.id}`} className="border-b">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover mr-4 rounded"
                          />
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500 capitalize">
                              {item.category.replace('-', ' ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">${item.price.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center max-w-[120px]">
                          <button
                            onClick={() => decreaseQuantity(item.id, item.category)}
                            className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-l border border-black hover:bg-white hover:text-black transition-colors"
                          >-
                          </button>
                          <span className="w-10 h-8 flex items-center justify-center border-t border-b border-gray-300 bg-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.id, item.category)}
                            className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-r border border-black hover:bg-white hover:text-black transition-colors"
                          >+
                          </button>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-semibold">${item.totalPrice.toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => removeFromCart(item.id, item.category)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y">
                {cartItems.map(item => (
                  <div key={`mobile-${item.category}-${item.id}`} className="p-4">
                    <div className="flex space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-sm sm:text-base line-clamp-1">{item.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.id, item.category)}
                            className="text-gray-400 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 capitalize mb-2">{item.category.replace('-', ' ')}</p>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center border rounded-md bg-white">
                            <button
                              onClick={() => decreaseQuantity(item.id, item.category)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100"
                            >-
                            </button>
                            <span className="mx-2 text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.id, item.category)}
                              className="w-7 h-7 flex items-center justify-center bg-gray-100"
                            >+
                            </button>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                            <p className="font-semibold text-right">${item.totalPrice.toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <Link
                  to="/products"
                  className="font-poppins px-6 py-3 bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300"
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
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
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
              
              <button className="w-full font-poppins bg-black text-white py-3 rounded border border-black hover:bg-white hover:text-black transition duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
