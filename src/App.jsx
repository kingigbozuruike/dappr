import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Recycle from "./components/Recycle";
import Recommended from "./components/Recommended";
import Footer from "./components/Footer";
import RecyclePage from "./components/RecyclePage";
import AuthPage from "./components/AuthPage";
import ProfilePage from "./components/ProfilePage";
import ProductCategoryPage from "./components/ProductCategoryPage";
import ProductsPage from "./components/ProductsPage";
import CartPage from "./components/CartPage";
import { CartProvider } from "./context/CartContext";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        setIsSignedIn(true);
      }
    };
    
    checkAuth();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsSignedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className={`min-h-screen w-full bg-white text-black`}>
          <Navbar isSignedIn={isSignedIn} onSignOut={handleSignOut} />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Categories />
                <div id="Recycle">
                  <Recycle />
                </div>
                <Recommended />
              </>
            } />
            <Route path="/recycle" element={<RecyclePage />} />
            <Route path="/auth" element={<AuthPage setIsSignedIn={setIsSignedIn} />} />
            <Route path="/profile" element={
              isSignedIn ? <ProfilePage /> : <AuthPage setIsSignedIn={setIsSignedIn} />
            } />
            <Route path="/category/:category" element={<ProductCategoryPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
