import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-10 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold font-bodoni hover:opacity-80 transition-opacity">
          Dappr.
        </Link>
      </div>
    </header>
  );
}

export default Header; 