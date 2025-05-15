import React, { useState } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaArrowUp } from 'react-icons/fa';

function Footer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black text-white mt-16 sm:mt-24 py-12 sm:py-16 w-full relative">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-black text-white p-2 sm:p-3 rounded-full border-2 border-white hover:bg-white hover:text-black hover:border-black transition duration-300 cursor-pointer shadow-lg z-50"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        {/* Contact Info */}
        <div>
          <h3 className="text-3xl sm:text-4xl font-bold font-bodoni mb-4">Dappr.</h3>
          <p className="font-poppins mb-2 text-sm sm:text-base">Email: support@dappr.co</p>
          <p className="font-poppins mb-2 text-sm sm:text-base">Phone: +1 (800) 555-1234</p>
          <p className="font-poppins mb-6 text-sm sm:text-base">
            Address: 123 AfroTech Way, Atlanta, GA
          </p>

          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaFacebook className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaInstagram className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
            <a href="https://github.com/kingigbozuruike/dappr/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 rounded-lg shadow-md space-y-3 sm:space-y-4">
          <h4 className="text-lg sm:text-xl font-semibold font-bodoni mb-2 text-black">Contact Us</h4>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black text-sm"
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="3"
              placeholder="Your message..."
              required
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white px-4 py-2 rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Copyright */}
      <div className="text-center mt-8 sm:mt-12 text-xs sm:text-sm text-gray-500 font-poppins">
        &copy; {new Date().getFullYear()} Dappr. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
