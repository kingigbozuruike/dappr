// src/pages/RecyclePage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlinePause, HiOutlinePlay } from 'react-icons/hi';
import { FaRecycle } from 'react-icons/fa';

function RecyclePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    items: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [estimatedPoints, setEstimatedPoints] = useState(0);
  const [calculatorItems, setCalculatorItems] = useState(0);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Mock user progress
  const userProgress = {
    itemsRecycled: 45,
    pointsEarned: 450,
    pointsToNextTier: 550,
    co2Saved: 22.5,
    nextTier: "Gold"
  };

  // Testimonials
  const testimonials = [
    {
      name: "Sarah M.",
      points: 1200,
      text: "I've recycled over 100 items with Dappr and earned enough points for a complete wardrobe refresh!",
      image: "/images/testimonial1.png"
    },
    {
      name: "James K.",
      points: 850,
      text: "The process is so easy, and I love knowing my clothes are being recycled responsibly.",
      image: "/images/testimonial2.png"
    },
    {
      name: "Emma L.",
      points: 1500,
      text: "Dappr's recycling program has helped me maintain a sustainable lifestyle while earning great rewards.",
      image: "/images/testimonial3.png"
    }
  ];

  // Carousel images
  const carouselImages = [
    '/images/Recycle page 0.png',
    '/images/Recycle page 2.jpeg',
    '/images/Recycle page 3.jpeg',
    '/images/Recycle page 4.jpeg',
    '/images/Recycle page 5.png'
  ];

  // Carousel auto-advance
  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(() => {
        setCurrentImageIndex(prev =>
          prev === carouselImages.length - 1 ? 0 : prev + 1
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPaused, carouselImages.length]);

  const togglePause = () => setIsPaused(paused => !paused);

  // FAQs
  const faqs = [
    {
      question: "What items can I recycle?",
      answer: "We accept all types of clothing items in good condition. This includes shirts, pants, dresses, jackets, and accessories. Items should be clean and free of major damage."
    },
    {
      question: "How do I earn points?",
      answer: "You earn 10 points for each item you recycle. Points can be redeemed for store credit or exclusive Dappr perks. Points are added to your account once we receive your items."
    },
    {
      question: "How long does shipping take?",
      answer: "Once you request a shipping label, you'll receive it via email within 24 hours. After sending your items, it typically takes 3-5 business days for us to receive them."
    }
  ];

  const toggleFaq = idx => setOpenFaq(openFaq === idx ? null : idx);

  // Form handlers & validation
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(err => ({ ...err, [name]: '' }));
  };

  const validateForm = () => {
    const newErr = {};
    if (!formData.fullName.trim()) newErr.fullName = 'Full name is required';
    if (!formData.email.trim()) newErr.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErr.email = 'Email is invalid';
    if (!formData.address.trim()) newErr.address = 'Shipping address is required';
    if (!formData.items) newErr.items = 'Number of items is required';
    else if (parseInt(formData.items) < 1) newErr.items = 'Must be at least 1 item';
    setErrors(newErr);
    return Object.keys(newErr).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', address: '', items: '' });
    }
  };

  // Points calculator
  const calculatePoints = items => {
    setCalculatorItems(items);
    setEstimatedPoints(items * 10);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-10">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl font-bold font-bodoni mb-4"
          >
            Recycle with Dappr
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl font-poppins text-gray-300"
          >
            Turn your old clothes into rewards. Earn points, save the planet, and get exclusive perks.
          </motion.p>
        </div>
      </div>

      {/* Carousel */}
      <div className="relative w-full h-[600px] overflow-hidden">
        {carouselImages.map((img, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-full flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentImageIndex === i ? 1 : 0,
              x: `${(i - currentImageIndex) * 100}%`
            }}
            transition={{ duration: 0.5 }}
          >
            <img src={img} alt={`Slide ${i+1}`} className="w-full h-full object-contain" />
          </motion.div>
        ))}
        <button
          onClick={togglePause}
          className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition duration-300 z-10"
        >
          {isPaused ? <HiOutlinePlay className="w-6 h-6" /> : <HiOutlinePause className="w-6 h-6" />}
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {carouselImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImageIndex(i)}
              className={`w-3 h-3 rounded-full transition duration-300 ${
                currentImageIndex === i ? 'bg-black scale-125' : 'bg-gray-400 hover:bg-gray-600'
              }`}
              aria-label={`Go to slide ${i+1}`}
            />
          ))}
        </div>
      </div>

      {/* Impact */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16"
      >
        <h2 className="text-3xl font-bold font-bodoni mb-8">Your Recycling Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-2xl font-bold text-black mb-2">{userProgress.itemsRecycled}</div>
            <p className="text-gray-600 font-poppins">Items Recycled</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-2xl font-bold text-black mb-2">{userProgress.pointsEarned} Points</div>
            <p className="text-gray-600 font-poppins">{userProgress.pointsToNextTier} to {userProgress.nextTier} Tier</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div 
                className="bg-black h-2.5 rounded-full" 
                style={{
                  width: `${(userProgress.pointsEarned / (userProgress.pointsEarned + userProgress.pointsToNextTier)) * 100}%`
                }}
              />
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="text-2xl font-bold text-black mb-2">{userProgress.co2Saved} kg</div>
            <p className="text-gray-600 font-poppins">CO2 Saved</p>
          </div>
        </div>
      </motion.section>

      {/* Calculator */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16 bg-gray-50"
      >
        <h2 className="text-3xl font-bold font-bodoni mb-8">Points Calculator</h2>
        <div className="max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Items</label>
          <input
            type="number"
            min="1"
            value={calculatorItems}
            onChange={e => calculatePoints(parseInt(e.target.value,10) || 0)}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black"
          />
          <div className="text-center mt-4">
            <div className="text-3xl font-bold text-black mb-1">{estimatedPoints} Points</div>
            <p className="text-gray-600 font-poppins">Estimated points you'll earn</p>
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section 
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16"
      >
        <h2 className="text-3xl font-bold font-bodoni mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t,i) => (
            <motion.div 
              key={i} 
              variants={fadeInUp} 
              transition={{ delay: i * 0.2 }} 
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="flex items-center mb-4">
                <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.points} Points</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"{t.text}"</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section 
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16"
      >
        <h2 className="text-3xl font-bold font-bodoni mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {["Collect","Ship","Earn"].map((step, i) => (
            <motion.div 
              key={step} 
              variants={fadeInUp} 
              transition={{ delay: i * 0.2 }} 
              className="bg-gray-50 p-6 rounded-lg"
            >
              <div className="text-2xl font-bold text-black mb-4">{i+1}. {step}</div>
              <p className="text-gray-600 font-poppins">
                {step === "Collect"
                  ? "Gather your gently used clothing items that you no longer wear."
                  : step === "Ship"
                  ? "Use our prepaid shipping label to send your items to our recycling center."
                  : "Get 10 points per item, redeemable for store credit and exclusive perks."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Start Recycling Form */}
      <motion.section 
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16 bg-gray-50 rounded-lg"
      >
        {isSubmitted ? (
          <div className="text-center py-8">
            <h3 className="text-2xl font-bold font-bodoni mb-4 text-green-600">Thank You!</h3>
            <p className="text-gray-600 font-poppins">
              Your shipping label request has been received. We'll send the label to your email within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold font-bodoni mb-6">Start Your Recycling Journey</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black`}
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>
              </div>
              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black`}
                  placeholder="Enter your shipping address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>
              {/* Items */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Items</label>
                <input
                  type="number"
                  name="items"
                  value={formData.items}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border ${errors.items ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black`}
                  placeholder="How many items are you recycling?"
                  min="1"
                />
                {errors.items && <p className="mt-1 text-sm text-red-500">{errors.items}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg border border-gray-500 hover:bg-white hover:text-black transition duration-300 font-medium active:scale-95"
              >
                Request Shipping Label
              </button>
            </form>
          </>
        )}
      </motion.section>

      {/* FAQ */}
      <motion.section 
        initial="hidden"
        whileInView="visible" 
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-7xl mx-auto px-10 py-16"
      >
        <h2 className="text-3xl font-bold font-bodoni mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              transition={{ delay: idx * 0.1 }} 
              className="border-b border-gray-200"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex justify-between items-center py-4 text-left"
              >
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    openFaq === idx ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <p className="text-gray-600 font-poppins pb-4">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default RecyclePage;
