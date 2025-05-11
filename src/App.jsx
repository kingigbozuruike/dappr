import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Recycle from "./components/Recycle";
import Recommended from "./components/Recommended";
import Footer from "./components/Footer";
import RecyclePage from "./components/RecyclePage";

function App() {
  return (
    <Router>
      <div className={`min-h-screen w-full bg-white text-black`}>
        <Navbar />
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
