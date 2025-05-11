import { motion } from "framer-motion";


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
  { name: "Men's \"Faith over Fear\" shorts.", price: "$42.00", image: Product1 },
  { name: "ASOS Design Boxy Oversized Abstract Graphic T-Shirt", price: "$45.00", image: Product2 },
  { name: "Modern Men's Abstract Street Art T-Shirt", price: "$40.00", image: Product3 },
  { name: "Textured Gray Full Suit - Fitted ", price: "$35.00", image: Product4 },
  { name: "Red Brown Auburn Color Straight Human Hair Wig", price: "$85.00", image: Product5 },
  { name: "The Body Shop Shea Body Butter", price: "$17.00", image: Product6 },
  { name: "Minimalistic Gold Coin Pendant Necklace Stack", price: "$20.00", image: Product7 },
  { name: "The King Mcneal Collection Alpha Neutral Chenille Pocket Crewneck 3XL / Gold", price: "$69.99", image: Product8 },
  { name: "AfroBeads Waist Beads in Black and White with Crystal Gold", price: "$16.99", image: Product9 },
  { name: "African Pride Moisture Miracle Oil Essential 5 Vitamin Oil 4oz, Curly, Coily Hair", price: "$9.15", image: Product10 },
  { name: "Satin Bonnet Silk Hair Bonnets for Black Women/Men Curly Hair Wrap for Sleeping C", price: "$11.48", image: Product11 },
  { name: "Liquid Concealer Makeup 4Pcs, Corrector Foundation for Black Women", price: "$16.00", image: Product12 },
];


function Recommended() {
    return (
      <section className="mt-24 px-10">
        <h2 className="text-3xl font-bold font-bodoni mb-10 text-center">
          Recommended for You
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(({ name, price, image }) => (
            <motion.div
                key={name}
                initial={{ opacity: 1 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:scale-105 group"
            >
                <div className="relative overflow-hidden">
                    <img
                    src={image}
                    alt={name}
                    className="w-full h-60 object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
                    />
                </div>
                <div className="p-4">
                <h3 className="font-poppins text-lg font-medium mb-1">{name}</h3>
                <p className="text-gray-700 font-semibold">{price}</p>
                </div>
            </motion.div>
        ))}
        </div>
        <div className="mt-10 text-center">
            <button className="font-bodoni px-6 py-3 bg-black text-white rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300">
                View All Products
            </button>
        </div>
      </section>
    );
}
  
export default Recommended;
  