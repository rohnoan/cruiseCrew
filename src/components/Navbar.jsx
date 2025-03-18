import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu

const navItems = [
  { name: "BIKES", link: "/bikes", id: 1 },
  { name: "ACCESSORIES", link: "/accessories", id: 2 },
  { name: "CART", link: "/cart", id: 3 },
  { name: "ACCOUNT", link: "/account", id: 4 },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white font-syne p-4 z-[9999]">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold z-[9999]">RIDE RENTALS</h1>
          <p className="text-xs text-center text-gray-400 z-[9999]">your ride your way.</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 z-[9999]">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="font-bold p-2 hover:scale-110 transition-transform z-[9999]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden z-[9999]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 md:hidden flex flex-col items-center mt-4 space-y-3 bg-black p-4 rounded-lg z-[9999]">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.link}
                className="w-full text-center p-2 hover:bg-gray-700 rounded z-[9999]"
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
