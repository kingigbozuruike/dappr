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
import AIAssistant from "./components/AIAssistant";
import SearchPage from "./components/SearchPage";
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";

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
    <UserProvider>
      <CartProvider>
        <Router>
          <div className={`min-h-screen w-full bg-white text-black`}>
            <Routes>
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="*" element={
                <>
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
                    <Route path="/search" element={<SearchPage />} />
                  </Routes>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
