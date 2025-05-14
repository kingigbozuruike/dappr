import { motion } from "framer-motion";
import { useState } from "react";
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
  { id: 1, name: "Men's \"Faith over Fear\" shorts.", price: 42.00, image: Product1, category: "clothing" },
  { id: 2, name: "ASOS Design Boxy Oversized Abstract Graphic T-Shirt", price: 45.00, image: Product2, category: "clothing" },
  { id: 3, name: "Modern Men's Abstract Street Art T-Shirt", price: 40.00, image: Product3, category: "clothing" },
  { id: 4, name: "Textured Gray Full Suit - Fitted ", price: 35.00, image: Product4, category: "clothing" },
  { id: 5, name: "Red Brown Auburn Color Straight Human Hair Wig", price: 85.00, image: Product5, category: "hair" },
  { id: 6, name: "The Body Shop Shea Body Butter", price: 17.00, image: Product6, category: "skin-care" },
  { id: 7, name: "Minimalistic Gold Coin Pendant Necklace Stack", price: 20.00, image: Product7, category: "clothing" },
  { id: 8, name: "The King Mcneal Collection Alpha Neutral Chenille Pocket Crewneck 3XL / Gold", price: 69.99, image: Product8, category: "clothing" },
  { id: 9, name: "AfroBeads Waist Beads in Black and White with Crystal Gold", price: 16.99, image: Product9, category: "clothing" },
  { id: 10, name: "African Pride Moisture Miracle Oil Essential 5 Vitamin Oil 4oz, Curly, Coily Hair", price: 9.15, image: Product10, category: "hair" },
  { id: 11, name: "Satin Bonnet Silk Hair Bonnets for Black Women/Men Curly Hair Wrap for Sleeping C", price: 11.48, image: Product11, category: "hair" },
  { id: 12, name: "Liquid Concealer Makeup 4Pcs, Corrector Foundation for Black Women", price: 16.00, image: Product12, category: "makeup" },
];

function Recommended() {
    const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();

    return (
      <section className="mt-24 px-10">
        <h2 className="text-3xl font-bold font-bodoni mb-10 text-center">
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
            <motion.div
                key={`${product.category}-${product.id}`}
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105 group"
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
                  <p className="text-gray-700 font-semibold">${product.price.toFixed(2)}</p>
                  
                  {cart[`${product.category}-${product.id}`] > 0 ? (
                    <div className="flex flex-col space-y-2 mt-3">
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
                      className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition-colors duration-300 mt-3"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
            </motion.div>
        ))}
        </div>
        <div className="mt-10 text-center">
            <Link to="/products" className="font-bodoni px-6 py-3 bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95">
                View All Products
            </Link>
        </div>
      </section>
    );
}
  
export default Recommended;
