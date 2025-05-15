import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Clothing from "../assets/clothing.png";
import Hair from "../assets/hair.png";
import Makeup from "../assets/makeup.png";
import SkinCare from "../assets/skincare.png";

const categories = [
  { title: "Clothing", image: Clothing, slug: "clothing" },
  { title: "Hair",     image: Hair,     slug: "hair"     },
  { title: "Makeup",   image: Makeup,   slug: "makeup"   },
  { title: "Skin Care",image: SkinCare, slug: "skin-care"},
];

function Categories() {
  return (
    <section className="mt-16 md:mt-24 px-4 sm:px-10">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="text-2xl sm:text-3xl font-bold font-bodoni mb-6 sm:mb-10 text-center"
      >
        Shop by Category
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
        {categories.map(({ title, image, slug }, index) => (
          <Link to={`/category/${slug}`} key={title}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-40 sm:h-52 md:h-64 rounded-xl overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105 hover:-rotate-1 cursor-pointer"
            >
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-xl sm:text-2xl font-semibold font-poppins z-10">
                  {title}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
