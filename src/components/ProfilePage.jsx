import { useState } from 'react';
import { FaUser, FaShippingFast, FaCoins, FaCog, FaRecycle, FaHistory } from 'react-icons/fa';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  
  // Mock user data (in a real app, this would come from props or context)
  const userData = {
    name: "David Orisakwe",
    email: "orisakwe@gmail.com",
    phone: "(555) 123-4567",
    recyclePoints: 450,
    address: {
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zip: "10001"
    },
    orders: [
      { id: "ORD-12345", date: "2025-05-10", status: "Delivered", total: "$129.99" },
      { id: "ORD-12346", date: "2025-04-28", status: "Processing", total: "$85.50" }
    ],
    recycleHistory: [
      { id: "REC-789", date: "2025-05-01", items: "2 dresses, 1 pair of jeans", points: 45 },
      { id: "REC-790", date: "2025-04-15", items: "3 shirts, 2 scarves", points: 30 }
    ]
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{userData.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{userData.phone}</p>
              </div>
            </div>
            <button className="mt-4 text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Edit Personal Information
            </button>
          </div>
        );
      case 'address':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Shipping Address</h3>
            <div className="border border-gray-200 p-4 rounded">
              <p className="font-medium">{userData.name}</p>
              <p>{userData.address.street}</p>
              <p>{userData.address.city}, {userData.address.state} {userData.address.zip}</p>
              <p>{userData.phone}</p>
            </div>
            <button className="mt-4 text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
              Edit Address
            </button>
          </div>
        );
      case 'rewards':
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-lg shadow-lg">
              <div>
                <p className="font-medium text-sm opacity-80">Available Points</p>
                <p className="text-3xl font-bold">{userData.recyclePoints}</p>
              </div>
              <FaCoins className="h-12 w-12 opacity-80" />
            </div>
            
            <div className="mt-6">
              <button className='bg-black text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-gray-800 transition hover:cursor-pointer'>
                Use your points!
              </button>
            </div>
          </div>
        );
      case 'recycle':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Recycling History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.recycleHistory.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{record.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{record.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4">
              <button 
                className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition"
                onClick={() => window.location.href='/recycle'}
              >
                <FaRecycle />
                Recycle More Items
              </button>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Order History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.orders.map((order) => (
                    <tr key={order.id} className="cursor-pointer hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Account Settings</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium">Password</h4>
              <button className="text-sm bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Change Password
              </button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Communication Preferences</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="email-marketing" className="mr-2" defaultChecked />
                  <label htmlFor="email-marketing">Email marketing</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="order-updates" className="mr-2" defaultChecked />
                  <label htmlFor="order-updates">Order updates</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="recycle-reminders" className="mr-2" defaultChecked />
                  <label htmlFor="recycle-reminders">Recycling reminders</label>
                </div>
              </div>
            </div>
            
            <div>
              <button className="text-sm text-red-600 hover:text-red-800 transition">
                Delete Account
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold font-bodoni mb-8">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar/Tab Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex flex-col space-y-1">
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'address' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('address')}
              >
                <FaShippingFast className="h-4 w-4" />
                <span>Address</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'rewards' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('rewards')}
              >
                <FaCoins className="h-4 w-4" />
                <span>Rewards</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'recycle' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('recycle')}
              >
                <FaRecycle className="h-4 w-4" />
                <span>Recycling</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('orders')}
              >
                <FaHistory className="h-4 w-4" />
                <span>Orders</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded ${activeTab === 'settings' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('settings')}
              >
                <FaCog className="h-4 w-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;