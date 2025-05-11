import RecycleImage from "../assets/recycle.png";

function Recycle() {
  return (
    <section className="py-20 mt-24 rounded-xl px-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-12">
        
        {/* Left Text Block */}
        <div className="max-w-xl">
          <h2 className="text-7xl font-bold font-bodoni mb-4 text-black">
            Recycle with Us!
          </h2>
          <p className="text-gray-700 text-lg mb-6 font-poppins">
            We believe fashion can be circular. For every item of clothing you recycle,
            you earn <span className="font-semibold text-black">10 points</span> — redeemable for store credit
            and exclusive Dappr perks.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded font-medium hover:bg-gray-800 transition">
            Start Recycling
          </button>
        </div>

        {/* Right Image */}
        <div className="w-[40%]">
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
