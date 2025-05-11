import Clothing from "../assets/clothing.png";
import Hair from "../assets/hair.png";
import Makeup from "../assets/makeup.png";
import SkinCare from "../assets/skincare.png";

const categories = [
    {
      title: "Clothing",
      image: Clothing,
    },
    {
      title: "Hair",
      image: Hair,
    },
    {
      title: "Makeup",
      image: Makeup,
    },
    {
      title: "Skin Care",
      image: SkinCare,
    },
];
  
function Categories() {
    return (
        <section className="mt-24 px-10">
        <h2 className="text-3xl font-bold font-bodoni mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-6">
          {categories.map(({ title, image }) => (
            <div
                key={title}
                className="relative h-64 rounded-xl overflow-hidden shadow-md transition duration-300 transform hover:scale-105 hover:-rotate-1"
            >
                <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover"
                />
            
                <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-white text-2xl font-semibold font-poppins z-10">
                    {title}
                </h3>
                </div>
            </div>        
          ))}
        </div>
      </section>
    );
}
export default Categories;
  