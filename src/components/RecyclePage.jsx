import React, { useState } from 'react';

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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.address.trim()) newErrors.address = 'Shipping address is required';
    if (!formData.items) newErrors.items = 'Number of items is required';
    else if (parseInt(formData.items) < 1) newErrors.items = 'Must be at least 1 item';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        address: '',
        items: ''
      });
    }
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header Section */}
      <div className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-10">
          <h1 className="text-5xl font-bold font-bodoni mb-4">Recycle with Dappr</h1>
          <p className="text-xl font-poppins text-gray-300">
            Turn your old clothes into rewards. Earn points, save the planet, and get exclusive perks.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-10 py-16">
        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold font-bodoni mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-black mb-4">1. Collect</div>
              <p className="text-gray-600 font-poppins">
                Gather your gently used clothing items that you no longer wear.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-black mb-4">2. Ship</div>
              <p className="text-gray-600 font-poppins">
                Use our prepaid shipping label to send your items to our recycling center.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-black mb-4">3. Earn</div>
              <p className="text-gray-600 font-poppins">
                Get 10 points per item, redeemable for store credit and exclusive perks.
              </p>
            </div>
          </div>
        </section>

        {/* Start Recycling Form */}
        <section className="bg-gray-50 p-8 rounded-lg">
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black focus:border-transparent`}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black focus:border-transparent`}
                      placeholder="Enter your email"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.address ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black focus:border-transparent`}
                    placeholder="Enter your shipping address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Items</label>
                  <input
                    type="number"
                    name="items"
                    value={formData.items}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${errors.items ? 'border-red-500' : 'border-gray-300'} rounded focus:ring-2 focus:ring-black focus:border-transparent`}
                    placeholder="How many items are you recycling?"
                    min="1"
                  />
                  {errors.items && <p className="mt-1 text-sm text-red-500">{errors.items}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 rounded-lg border border-gray-500 hover:bg-white hover:text-black transition duration-300 font-medium active:scale-95 cursor-pointer"
                >
                  Request Shipping Label
                </button>
              </form>
            </>
          )}
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold font-bodoni mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-4 text-left cursor-pointer"
                >
                  <h3 className="text-xl font-semibold">{faq.question}</h3>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-gray-600 font-poppins pb-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecyclePage; 