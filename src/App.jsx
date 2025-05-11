import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import Recycle from "./components/Recycle";
import Recommended from "./components/Recommended";
import Footer from "./components/Footer";

import { useEffect, useState } from "react";


function App() {
  return (
    <div className={`min-h-screen w-full bg-white text-black`}>
      <Navbar />
      <Hero />
      <Categories />
      <div id="Recycle">
        <Recycle />
      </div>
      <Recommended />
      <Footer/>
    </div>
  );
}

export default App;
