import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [profileImage, setProfileImage] = useState('/images/Profile photo.jpg');
  const [userData, setUserData] = useState({
    name: "David Orisakwe",
    email: "davidorisakwe2023@gmail.com",
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
  });

  // Function to update profile image
  const updateProfileImage = (newImage) => {
    setProfileImage(newImage);
  };

  // Value to be provided to consuming components
  const value = {
    profileImage,
    updateProfileImage,
    userData,
    setUserData
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Custom hook to use the user context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext; 