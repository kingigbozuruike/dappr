// src/components/Recycle.jsx
import { Link } from "react-router-dom";
import RecycleImage from "../assets/recycle.png";

function Recycle() {
  return (
    <section className="py-12 sm:py-20 mt-16 md:mt-24 rounded-xl px-4 sm:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
        
        {/* Left Text Block */}
        <div className="max-w-xl order-2 md:order-1 text-center md:text-left">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold font-bodoni mb-4 text-black">
            Recycle with Us!
          </h2>
          <p className="text-gray-700 text-base sm:text-lg mb-6 font-poppins">
            We believe fashion can be circular. For every item of clothing you recycle,
            you earn <span className="font-semibold text-black">10 points</span> — redeemable for store credit
            and exclusive Dappr perks.
          </p>
          <Link to="/recycle">
            <button className="bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 cursor-pointer">
              Start Recycling
            </button>
          </Link>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-[40%] mb-8 md:mb-0 order-1 md:order-2">
          <img
            src={RecycleImage}
            alt="Recycling clothes"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

export default Recycle;
