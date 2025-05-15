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
        // Here you would typically handle the form submission
        console.log('Form submitted:', formData);
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <footer className="bg-black text-white mt-24 py-16 w-full relative">
            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-8 right-8 bg-black text-white p-3 rounded-full border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 shadow-lg cursor-pointer z-50"
                aria-label="Back to top"
            >
                <FaArrowUp className="w-6 h-6" />
            </button>

            <div className="max-w-7xl mx-auto px-10 grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Contact Info */}
                <div>
                    <h3 className="text-4xl font-bold font-bodoni mb-4">Dappr.</h3>
                    <p className="font-poppins mb-2">
                        Email: support@dappr.co
                    </p>
                    <p className="font-poppins mb-2">
                        Phone: +1 (800) 555-1234
                    </p>
                    <p className="font-poppins mb-6">
                        Address: 123 AfroTech Way, Atlanta, GA
                    </p>
                    
                    {/* Social Media Icons */}
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors cursor-pointer">
                            <FaFacebook className="w-6 h-6" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors cursor-pointer">
                            <FaTwitter className="w-6 h-6" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors cursor-pointer">
                            <FaInstagram className="w-6 h-6" />
                        </a>
                        <a href="https://github.com/kingigbozuruike/dappr/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors cursor-pointer">
                            <FaGithub className="w-6 h-6" />
                        </a>
                    </div>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
                    <h4 className="text-xl font-semibold font-bodoni mb-2 text-black">Contact Us</h4>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent text-black"
                            placeholder="Your message..."
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white px-4 py-2 rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 cursor-pointer"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            {/* Copyright */}
            <div className="text-center mt-12 text-sm text-gray-500 font-poppins">
                &copy; {new Date().getFullYear()} Dappr. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;
  