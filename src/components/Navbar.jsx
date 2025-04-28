import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User } from "lucide-react"; // Icons for menu and User icon
import { useAuth } from '../context/AuthContext';

const navItems = [
  { name: "BIKES", link: "/bikes", id: 1 },
  { name: "ACCESSORIES", link: "/accessories", id: 2 },
  { name: "CART", link: "/cart", id: 3 },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/account');
  };

  const handleLogin = () => {
    navigate('/account');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black text-white font-syne p-4 z-[9999]">
      <div className="flex justify-between items-center max-w-6xl mx-auto relative">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold z-[9999]">RIDE RENTALS</h1>
          <p className="text-xs text-center text-gray-400 z-[9999]">your ride your way.</p>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 z-[9999]">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className="font-bold p-2 hover:scale-110 transition-transform z-[9999]"
            >
              {item.name}
            </Link>
          ))}

          {/* Modified User Profile/Login Button */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 font-bold p-2 hover:scale-110 transition-transform">
                <User size={20} />
                <span>{user.username}</span>
              </button>
              {/* Modified dropdown menu with better hover behavior */}
              <div className="absolute right-0 mt-2 w-48 bg-black rounded-lg shadow-lg py-2 invisible group-hover:visible hover:visible transition-all duration-300 opacity-0 group-hover:opacity-100">
                <Link
                  to={user.role === 'renter' ? '/seller' : '/customer'}
                  className="block px-4 py-2 hover:bg-gray-700 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700 text-red-400 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="font-bold p-2 hover:scale-110 transition-transform bg-white text-black rounded-lg px-4"
            >
              Login
            </button>
          )}
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
            {/* Mobile User Profile/Login */}
            {user ? (
              <>
                <Link
                  to={user.role === 'renter' ? '/seller' : '/customer'}
                  className="w-full text-center p-2 hover:bg-gray-700 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  {user.username}'s Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-center p-2 hover:bg-gray-700 rounded text-red-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogin();
                  setMenuOpen(false);
                }}
                className="w-full text-center p-2 bg-white text-black rounded"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
