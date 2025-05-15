// src/pages/ProfilePage.jsx
import React, { useState, useRef, useEffect } from 'react';
import {
  FaUser,
  FaShippingFast,
  FaCoins,
  FaRecycle,
  FaHistory,
  FaCog,
  FaCamera
} from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { userData, profileImage, updateProfileImage, setUserData } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => window.scrollTo(0, 0), []);

  // --- Personal info edit state ---
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name:    userData.name,
    email:   userData.email,
    phone:   userData.phone
  });

  // --- Address edit state ---
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editAddressData, setEditAddressData] = useState({
    street:  userData.address.street,
    city:    userData.address.city,
    state:   userData.address.state,
    zip:     userData.address.zip
  });

  // Image upload handler
  const handleImageUpload = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      updateProfileImage(evt.target.result);
      // TODO: also persist to server if applicable
    };
    reader.readAsDataURL(file);
  };

  // Trigger hidden file input
  const triggerFileInput = () => fileInputRef.current.click();

  // Form handlers
  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditFormData(fd => ({ ...fd, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    setUserData({ ...userData, ...editFormData });
    setIsEditing(false);
  };

  const handleAddressInputChange = e => {
    const { name, value } = e.target;
    setEditAddressData(ad => ({ ...ad, [name]: value }));
  };
  const handleAddressSubmit = e => {
    e.preventDefault();
    setUserData({
      ...userData,
      address: { ...editAddressData }
    });
    setIsEditingAddress(false);
  };

  // Render each tab's content
  const renderTabContent = () => {
    switch (activeTab) {
      // --------- PROFILE ---------
      case 'profile':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Personal Information</h3>

            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['name','email','phone'].map(field => (
                    <div key={field}>
                      <label className="block text-sm text-gray-500 capitalize">
                        {field}
                      </label>
                      <input
                        name={field}
                        type={field === 'email' ? 'email' : 'text'}
                        value={editFormData[field]}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 border"
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
                  className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
                >
                  Edit Personal Information
                </button>
              </>
            )}
          </div>
        );

      // --------- ADDRESS ---------
      case 'address':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Shipping Address</h3>

            {isEditingAddress ? (
              <form onSubmit={handleAddressSubmit} className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-500">Street</label>
                    <input
                      name="street"
                      value={editAddressData.street}
                      onChange={handleAddressInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">City</label>
                    <input
                      name="city"
                      value={editAddressData.city}
                      onChange={handleAddressInputChange}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm text-gray-500">State</label>
                      <input
                        name="state"
                        value={editAddressData.state}
                        onChange={handleAddressInputChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500">ZIP</label>
                      <input
                        name="zip"
                        value={editAddressData.zip}
                        onChange={handleAddressInputChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-black"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
                  >
                    Save Address
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingAddress(false)}
                    className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100 border"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="border p-4 rounded space-y-1">
                  <p className="font-medium">{userData.name}</p>
                  <p>{userData.address.street}</p>
                  <p>
                    {userData.address.city}, {userData.address.state}{' '}
                    {userData.address.zip}
                  </p>
                  <p>{userData.phone}</p>
                </div>
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
                >
                  Edit Address
                </button>
              </>
            )}
          </div>
        );

      // --------- REWARDS ---------
      case 'rewards':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gradient-to-r from-gray-500 to-gray-600 text-white p-6 rounded-lg">
              <div>
                <p className="text-sm opacity-80">Available Points</p>
                <p className="text-3xl font-bold">{userData.recyclePoints}</p>
              </div>
              <FaCoins className="text-4xl opacity-80" />
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
            >
              Use your points!
            </Link>
          </div>
        );

      // --------- RECYCLING HISTORY ---------
      case 'recycle':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Recycling History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['ID','Date','Items','Points'].map(col => (
                      <th
                        key={col}
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.recycleHistory.map(r => (
                    <tr key={r.id}>
                      <td className="px-6 py-4 text-sm font-medium">{r.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.date}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.items}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{r.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => (window.location.href = '/recycle')}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border"
            >
              <FaRecycle />
              Recycle More Items
            </button>
          </div>
        );

      // --------- ORDER HISTORY ---------
      case 'orders':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium">Order History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Order #','Date','Status','Total'].map(col => (
                      <th
                        key={col}
                        className="px-6 py-3 text-xs font-medium text-gray-500 uppercase"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userData.orders.map(o => (
                    <tr key={o.id} className="hover:bg-gray-50 cursor-pointer">
                      <td className="px-6 py-4 text-sm font-medium">{o.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{o.date}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            o.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {o.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{o.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      // --------- SETTINGS ---------
      case 'settings':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">Account Settings</h3>
            <div>
              <h4 className="font-medium">Password</h4>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-white hover:text-black border">
                Change Password
              </button>
            </div>
            <div>
              <h4 className="font-medium mb-2">Communication Preferences</h4>
              {[
                { id:'email-marketing', label:'Email Marketing' },
                { id:'order-updates',   label:'Order Updates' },
                { id:'recycle-reminders',label:'Recycling Reminders' }
              ].map(({id,label}) => (
                <div key={id} className="flex items-center mb-2">
                  <input id={id} type="checkbox" className="mr-2" defaultChecked />
                  <label htmlFor={id}>{label}</label>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to sign out?')) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('userEmail');
                    window.location.href = '/';
                  }
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded"
              >
                Sign Out
              </button>
              <button className="px-4 py-2 text-red-600 hover:text-red-800 transition">
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
    <div className="pt-24 pb-16 px-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bodoni mb-8">My Account</h1>

      {/* Profile picture + upload */}
      <div className="flex items-center mb-8">
        <div className="relative w-45 h-45 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src={profileImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <button
            onClick={triggerFileInput}
            className="absolute bottom-2 right-2 bg-black text-white p-2.5 rounded-full hover:bg-gray-800 transition"
            aria-label="Change profile picture"
          >
            <FaCamera className="h-5 w-5" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <p className="ml-4 text-sm text-gray-500">
          Click the camera icon to update your picture
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <nav className="md:w-48 flex md:flex-col space-x-2 md:space-x-0 md:space-y-1">
          {[
            { key:'profile', label:'Profile', icon:FaUser },
            { key:'address', label:'Address', icon:FaShippingFast },
            { key:'rewards', label:'Rewards', icon:FaCoins },
            { key:'recycle', label:'Recycling', icon:FaRecycle },
            { key:'orders',  label:'Orders', icon:FaHistory },
            { key:'settings',label:'Settings', icon:FaCog }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex items-center gap-2 p-2 rounded
                  ${active ? 'bg-black text-white' : 'hover:bg-gray-100'}
                `}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Main Content */}
        <section className="flex-1 bg-white border border-gray-200 rounded p-6">
          {renderTabContent()}
        </section>
      </div>
    </div>
  );
}
