import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { productsByCategory } from "./ProductCategoryPage";
import { FaArrowLeft } from "react-icons/fa";
import ModelFront from "../assets/products/Model for eco dress front.png";
import ModelBack from "../assets/products/Model for eco dress back.png";
import DressAlone from "../assets/products/eco dress alone.png";

export default function ProductDetailPage() {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const productId = parseInt(id, 10);
    const foundProduct = productsByCategory[category]?.find(p => p.id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
      // Set the three images for the eco-friendly cotton dress
      if (foundProduct.id === 1 && category === "clothing") {
        setImages([ModelFront, ModelBack, DressAlone]);
      } else {
        // For other products, use their single image
        setImages([foundProduct.image, foundProduct.image, foundProduct.image]);
      }
    }
  }, [category, id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const cartKey = `${category}-${product.id}`;
  const quantity = cart[cartKey] || 0;

  return (
    <div className="container mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-black mb-8 transition-colors"
      >
        <FaArrowLeft className="mr-2" />
        Back to Products
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[3/4] overflow-hidden rounded-lg"
          >
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="grid grid-cols-3 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative aspect-[3/4] overflow-hidden rounded-lg border-2 transition-all ${
                  selectedImage === index
                    ? "border-black"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col"
        >
          <h1 className="text-3xl md:text-4xl font-bold font-bodoni mb-4">
            {product.name}
          </h1>
          
          <p className="text-2xl font-semibold mb-6">
            ${product.price.toFixed(2)}
          </p>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">
              A beautiful eco-friendly cotton dress made from sustainable materials. 
              This dress features a flattering silhouette and is perfect for any occasion. 
              Made with care for both style and the environment.
            </p>
          </div>

          {product.size && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Size</h2>
              <div className="flex gap-2">
                {product.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>100% Organic Cotton</li>
              <li>Machine washable</li>
              <li>Made with sustainable practices</li>
              <li>Available in sizes {product.size?.map(s => s.toUpperCase()).join(", ")}</li>
            </ul>
          </div>

          <div className="mt-auto">
            {quantity > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-green-600 font-medium">Added to cart</span>
                  <span className="font-medium">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between border rounded-md p-1">
                  <button
                    onClick={() => decreaseQuantity(product.id, category)}
                    className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-l border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    –
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center border-t border-b border-gray-300 bg-white font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => increaseQuantity(product.id, category)}
                    className="w-12 h-12 flex items-center justify-center bg-black text-white rounded-r border border-black hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  if (product.size && !selectedSize) {
                    alert("Please select a size");
                    return;
                  }
                  addToCart(product.id, category);
                }}
                className="w-full bg-black text-white py-4 px-6 rounded border border-black hover:bg-white hover:text-black transition cursor-pointer text-lg font-medium"
              >
                Add to Cart
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 