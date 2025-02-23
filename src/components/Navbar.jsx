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
    <nav className="bg-black text-white font-syne p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">RIDE RENTALS</h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="font-bold p-2 hover:scale-110 transition-transform"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-3 bg-[] p-4 rounded-lg">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="w-full text-center p-2 hover:bg-gray-700 rounded"
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
