import { createContext, useState, useContext } from 'react';

// Create the context
const UserContext = createContext();

// Create a provider component
export function UserProvider({ children }) {
  const [profileImage, setProfileImage] = useState('/images/Profile photo.jpg');
  const [userData, setUserData] = useState(null);  // Initialize as null instead of default data

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