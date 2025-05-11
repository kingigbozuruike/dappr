function Footer() {
    return (
        <footer className="bg-black text-white mt-24 py-16 w-full">
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
            <p className="font-poppins">
              Address: 123 AfroTech Way, Atlanta, GA
            </p>
          </div>
  
          {/* Contact Form */}
          <form className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h4 className="text-xl font-semibold font-bodoni mb-2 text-black">Contact Us</h4>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <textarea
              rows="4"
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
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
  