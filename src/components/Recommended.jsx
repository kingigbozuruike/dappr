// src/components/Recommended.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

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

const products = [
  { id: 1,  name: `Men's "Faith over Fear" shorts.`, price: 42.00, image: Product1,  category: "clothing" },
  { id: 2,  name: "ASOS Design Boxy Oversized Abstract Graphic T-Shirt", price: 45.00, image: Product2,  category: "clothing" },
  { id: 3,  name: "Modern Men's Abstract Street Art T-Shirt", price: 40.00, image: Product3,  category: "clothing" },
  { id: 4,  name: "Textured Gray Full Suit - Fitted", price: 35.00, image: Product4,  category: "clothing" },
  { id: 5,  name: "Red Brown Auburn Color Straight Human Hair Wig", price: 85.00, image: Product5,  category: "hair" },
  { id: 6,  name: "The Body Shop Shea Body Butter", price: 17.00, image: Product6,  category: "skin-care" },
  { id: 7,  name: "Minimalistic Gold Coin Pendant Necklace Stack", price: 20.00, image: Product7,  category: "clothing" },
  { id: 8,  name: "The King Mcneal Collection Alpha Neutral Chenille Pocket Crewneck 3XL / Gold", price: 69.99, image: Product8,  category: "clothing" },
  { id: 9,  name: "AfroBeads Waist Beads in Black and White with Crystal Gold", price: 16.99, image: Product9,  category: "clothing" },
  { id: 10, name: "African Pride Moisture Miracle Oil Essential 5 Vitamin Oil 4oz, Curly, Coily Hair", price: 9.15, image: Product10, category: "hair" },
  { id: 11, name: "Satin Bonnet Silk Hair Bonnets for Black Women/Men Curly Hair Wrap for Sleeping C", price: 11.48, image: Product11, category: "hair" },
  { id: 12, name: "Liquid Concealer Makeup 4Pcs, Corrector Foundation for Black Women", price: 16.00, image: Product12, category: "makeup" },
];

export default function Recommended() {
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

  // On mobile show only the first 8 items; on larger screens, show all
  const displayedProducts = window.innerWidth < 768 
    ? products.slice(0, 8) 
    : products;

  return (
    <section className="mt-16 md:mt-24 px-4 sm:px-10">
      <h2 className="text-2xl sm:text-3xl font-bold font-bodoni mb-6 sm:mb-10 text-center">
        Recommended for You
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {displayedProducts.map((product) => (
          <motion.div
            key={`${product.category}-${product.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 group"
          >
            <div className="relative overflow-hidden h-40 sm:h-52 md:h-60">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
              />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
              <h3 className="font-poppins text-sm sm:text-base md:text-lg font-medium mb-1 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-gray-700 font-semibold mb-2">
                ${product.price.toFixed(2)}
              </p>

              {cart[`${product.category}-${product.id}`] > 0 ? (
                <div className="mt-auto flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-green-600 text-xs sm:text-sm font-medium">
                      Added to cart
                    </span>
                    <span className="text-xs sm:text-sm font-medium">
                      ${(product.price * cart[`${product.category}-${product.id}`]).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-1">
                    <button
                      onClick={() => decreaseQuantity(product.id, product.category)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      –
                    </button>
                    <span className="text-sm sm:text-base font-medium">
                      {cart[`${product.category}-${product.id}`]}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id, product.category)}
                      className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => addToCart(product.id, product.category)}
                  className="mt-auto w-full bg-black text-white text-xs sm:text-sm py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 text-center">
        <Link
          to="/products"
          className="font-bodoni px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
}
