import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import HeroImage1 from "../assets/testing.png";
import HeroImage2 from "../assets/testing2.png";
import HeroImage3 from "../assets/testing3.png";
import HeroImage4 from "../assets/testing4.png";
import HeroImage5 from "../assets/testing5.png";
import HeroImage6 from "../assets/testing6.png";
import HeroImage7 from "../assets/testing7.png";

function Hero() {
    return (
      <section className="flex justify-between items-center gap-12 mt-24 px-10 pt-10 pb-16">
        {/* Left content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-xl pl-15 pt-10"
        >
          <h1 className="font-bodoni text-5xl font-bold leading-tight mb-6">
            The Ultimate Fashion Place for Melanated People
          </h1>
          <p className="font-poppins text-gray-600 mb-8">
            Discover style, skincare, hair, and makeup curated with melanin in mind. From confident streetwear to natural beauty must-haves — it's all here.
          </p>
          <button className="bg-black text-white px-6 py-3 rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 cursor-pointer">
            Shop Now
          </button>
        </motion.div>
  
        {/* Right image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="w-[50%]"
        >
          <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="rounded-lg shadow-xl"
          >
              <SwiperSlide>
                  <img src={HeroImage1} alt="Slide 1" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage2} alt="Slide 2" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage3} alt="Slide 3" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage4} alt="Slide 4" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage5} alt="Slide 5" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage6} alt="Slide 6" className="rounded-lg w-full" />
              </SwiperSlide>
              <SwiperSlide>
                  <img src={HeroImage7} alt="Slide 7" className="rounded-lg w-full" />
              </SwiperSlide>
          </Swiper>
        </motion.div>
      </section>
    );
  }
  
  export default Hero;
  