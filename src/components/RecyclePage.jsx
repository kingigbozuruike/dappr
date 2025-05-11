import React from 'react';

function RecyclePage() {
  return (
    <div className="min-h-screen bg-white">
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
          <h2 className="text-3xl font-bold font-bodoni mb-6">Start Your Recycling Journey</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Shipping Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="Enter your shipping address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Items</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="How many items are you recycling?"
                min="1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg border border-gray-500 hover:bg-white hover:text-black transition duration-300 font-medium"
            >
              Request Shipping Label
            </button>
          </form>
        </section>

        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold font-bodoni mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">What items can I recycle?</h3>
              <p className="text-gray-600 font-poppins">
                We accept all types of clothing items in good condition. This includes shirts, pants, dresses, 
                jackets, and accessories. Items should be clean and free of major damage.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">How do I earn points?</h3>
              <p className="text-gray-600 font-poppins">
                You earn 10 points for each item you recycle. Points can be redeemed for store credit 
                or exclusive Dappr perks. Points are added to your account once we receive your items.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-xl font-semibold mb-2">How long does shipping take?</h3>
              <p className="text-gray-600 font-poppins">
                Once you request a shipping label, you'll receive it via email within 24 hours. 
                After sending your items, it typically takes 3-5 business days for us to receive them.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default RecyclePage; 