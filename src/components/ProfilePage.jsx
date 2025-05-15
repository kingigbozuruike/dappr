import { useState, useRef, useEffect } from 'react';
import { FaUser, FaShippingFast, FaCoins, FaCog, FaRecycle, FaHistory, FaCamera } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const { profileImage, updateProfileImage, userData, setUserData } = useUser();
  const navigate = useNavigate();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // State for edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone
  });
  
  // State for address edit mode
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({
    street: userData.address.street,
    city: userData.address.city,
    state: userData.address.state,
    zip: userData.address.zip
  });
  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateProfileImage(e.target.result);
        // In a real app, you would upload this to your server/cloud storage
        // and update the user profile in the database
        
        // For example: uploadProfileImageToServer(file).then(url => updateUserProfile({profileImage: url}))
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };
  
  // Handle input changes for personal info
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };
  
  // Handle input changes for address
  const handleAddressInputChange = (e) => {
    const { name, value } = e.target;
    setEditAddressData({
      ...editAddressData,
      [name]: value
    });
  };
  
  // Handle form submission for personal info
  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone
    });
    setIsEditing(false);
  };
  
  // Handle form submission for address
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setUserData({
      ...userData,
      address: {
        street: editAddressData.street,
        city: editAddressData.city,
        state: editAddressData.state,
        zip: editAddressData.zip
      }
    });
    setIsEditingAddress(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Personal Information</h3>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-500">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={editFormData.name} 
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-500">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={editFormData.email} 
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-500">Phone</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone" 
                      value={editFormData.phone} 
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    type="submit" 
                    className="text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                  >
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditing(false)}
                    className="text-sm bg-white text-black border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition duration-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
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
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-4 text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                >
                  Edit Personal Information
                </button>
              </>
            )}
          </div>
        );
      case 'address':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Shipping Address</h3>
            
            {isEditingAddress ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label htmlFor="street" className="block text-sm text-gray-500">Street Address</label>
                    <input 
                      type="text" 
                      id="street" 
                      name="street" 
                      value={editAddressData.street} 
                      onChange={handleAddressInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm text-gray-500">City</label>
                    <input 
                      type="text" 
                      id="city" 
                      name="city" 
                      value={editAddressData.city} 
                      onChange={handleAddressInputChange}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="state" className="block text-sm text-gray-500">State</label>
                      <input 
                        type="text" 
                        id="state" 
                        name="state" 
                        value={editAddressData.state} 
                        onChange={handleAddressInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zip" className="block text-sm text-gray-500">ZIP Code</label>
                      <input 
                        type="text" 
                        id="zip" 
                        name="zip" 
                        value={editAddressData.zip} 
                        onChange={handleAddressInputChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    type="submit" 
                    className="text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                  >
                    Save Address
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setIsEditingAddress(false)}
                    className="text-sm bg-white text-black border border-gray-500 px-4 py-2 rounded hover:bg-gray-100 transition duration-300 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="border border-gray-200 p-4 rounded">
                  <p className="font-medium">{userData.name}</p>
                  <p>{userData.address.street}</p>
                  <p>{userData.address.city}, {userData.address.state} {userData.address.zip}</p>
                  <p>{userData.phone}</p>
                </div>
                <button 
                  onClick={() => setIsEditingAddress(true)}
                  className="mt-4 text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer"
                >
                  Edit Address
                </button>
              </>
            )}
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
              <Link to="/products" className="text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer inline-flex items-center gap-2">
                Use your points!
              </Link>
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
                className="text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer flex items-center gap-2"
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
              <button className="text-sm bg-black text-white border border-gray-500 px-4 py-2 rounded hover:bg-white hover:text-black transition duration-300 cursor-pointer">
                Change Password
              </button>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Communication Preferences</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="email-marketing" className="mr-2 cursor-pointer" defaultChecked />
                  <label htmlFor="email-marketing" className="cursor-pointer">Email marketing</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="order-updates" className="mr-2 cursor-pointer" defaultChecked />
                  <label htmlFor="order-updates" className="cursor-pointer">Order updates</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="recycle-reminders" className="mr-2 cursor-pointer" defaultChecked />
                  <label htmlFor="recycle-reminders" className="cursor-pointer">Recycling reminders</label>
                </div>
              </div>
            </div>
            
            <div>
              <button className="text-sm text-red-600 border border-red-300 px-4 py-2 rounded hover:bg-red-50 transition duration-300 cursor-pointer">
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
      <div className="flex flex-col items-start mb-8">
        <h1 className="text-3xl font-bold font-bodoni mb-6">My Account</h1>
        
        {/* Profile Picture */}
        <div className="relative mb-4">
          <div className="w-50 h-50 rounded-full overflow-hidden border-2 border-gray-200">
            <img 
              src={profileImage} 
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <button 
            onClick={triggerFileInput}
            className="absolute bottom-2 right-2 bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition duration-300 cursor-pointer"
          >
            <FaCamera className="h-5 w-5" />
          </button>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
            ref={fileInputRef}
          />
        </div>
        <p className="text-sm text-gray-500 mb-4">Click the camera icon to update your profile picture</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar/Tab Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded p-4">
            <div className="flex flex-col space-y-1">
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'profile' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('profile')}
              >
                <FaUser className="h-4 w-4" />
                <span>Profile</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'address' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('address')}
              >
                <FaShippingFast className="h-4 w-4" />
                <span>Address</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'rewards' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('rewards')}
              >
                <FaCoins className="h-4 w-4" />
                <span>Rewards</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'recycle' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('recycle')}
              >
                <FaRecycle className="h-4 w-4" />
                <span>Recycling</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                onClick={() => setActiveTab('orders')}
              >
                <FaHistory className="h-4 w-4" />
                <span>Orders</span>
              </button>
              <button 
                className={`flex items-center space-x-2 p-2 text-left rounded cursor-pointer ${activeTab === 'settings' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
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