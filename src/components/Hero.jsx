import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay }             from 'swiper/modules';
import { motion }               from 'framer-motion';
import { useNavigate }          from 'react-router-dom';
import 'swiper/css';

import HeroImage1 from "../assets/testing.png";
import HeroImage2 from "../assets/testing2.png";
import HeroImage3 from "../assets/testing3.png";
import HeroImage4 from "../assets/testing4.png";
import HeroImage5 from "../assets/testing5.png";
import HeroImage6 from "../assets/testing6.png";
import HeroImage7 from "../assets/testing7.png";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-col md:flex-row justify-between items-center
                        gap-6 md:gap-12
                        mt-20 md:mt-24
                        px-4 sm:px-10
                        pt-6 md:pt-10
                        pb-10 md:pb-16">
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="max-w-xl
                   md:pl-15
                   pt-4 md:pt-10
                   order-2 md:order-1
                   text-center md:text-left"
      >
        <h1 className="font-bodoni text-4xl sm:text-5xl md:text-7xl
                       font-bold leading-tight
                       mb-4 md:mb-6">
          Black Fashion? It&apos;s All Here.
        </h1>
        <p className="font-poppins text-gray-600 mb-6 md:mb-8">
          Explore clothing, hair, skin care, and makeup inspired by Black expression — made for anyone who values bold, confident style.
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-black text-white px-6 py-3 rounded border border-gray-500
                     hover:bg-white hover:text-black
                     transition duration-300 active:scale-95
                     cursor-pointer
                     relative overflow-hidden shadow-md
                     transform hover:scale-105 hover:-rotate-1"
        >
          Shop Now
        </button>
      </motion.div>

      {/* Right carousel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="w-full md:w-[50%]
                   order-1 md:order-2
                   mb-6 md:mb-0"
      >
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="rounded-lg shadow-xl"
        >
          {[HeroImage1,HeroImage2,HeroImage3,HeroImage4,HeroImage5,HeroImage6,HeroImage7].map((src,i) => (
            <SwiperSlide key={i}>
              <img src={src} alt={`Slide ${i+1}`} className="rounded-lg w-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}

export default Hero;
