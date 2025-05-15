import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes, 
  Route,
  useLocation
} from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { UserProvider, useUser } from './context/UserContext';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Recycle from './components/Recycle';
import Recommended from './components/Recommended';
import Footer from './components/Footer';
import RecyclePage from './components/RecyclePage';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import ProductCategoryPage from './components/ProductCategoryPage';
import ProductsPage from './components/ProductsPage';
import CartPage from './components/CartPage';
import AIAssistant from './components/AIAssistant';
import SearchPage from './components/SearchPage';
import FloatingAIButton from './components/FloatingAIButton';

function AppContent() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const location = useLocation();
  const isAIAssistantPage = location.pathname === '/ai-assistant';
  const { setUserData } = useUser();

  // On mount, check for stored token
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsSignedIn(true);
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsSignedIn(false);
    setUserData(null);
  };

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <Routes>
        {/* Full-screen AI assistant route */}
        <Route path="/ai-assistant" element={<AIAssistant />} />

        {/* Everything else */}
        <Route
          path="*"
          element={
            <>
              <Navbar isSignedIn={isSignedIn} onSignOut={handleSignOut} />

              <Routes>
                {/* Home */}
                <Route
                  path="/"
                  element={
                    <>
                      <Hero />
                      <Categories />
                      <div id="Recycle">
                        <Recycle />
                      </div>
                      <Recommended />
                    </>
                  }
                />

                {/* Recycling pages */}
                <Route path="/recycle" element={<RecyclePage />} />

                {/* Authentication */}
                <Route
                  path="/auth"
                  element={<AuthPage setIsSignedIn={setIsSignedIn} />}
                />

                {/* Profile—protected */}
                <Route
                  path="/profile"
                  element={
                    isSignedIn
                      ? <ProfilePage />
                      : <AuthPage setIsSignedIn={setIsSignedIn} />
                  }
                />

                {/* Products by category & list */}
                <Route path="/category/:category" element={<ProductCategoryPage />} />
                <Route path="/products" element={<ProductsPage />} />

                {/* Cart & search */}
                <Route path="/cart" element={<CartPage />} />
                <Route path="/search" element={<SearchPage />} />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>

      {/* Floating AI button everywhere except on the assistant itself */}
      {!isAIAssistantPage && <FloatingAIButton />}
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}
