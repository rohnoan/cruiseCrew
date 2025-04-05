import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Bike, Package, LogOut, User, Clock, MapPin, Bell } from "lucide-react"; // Added more icons
import bg from "../../public/bg/bgaccounts.jpg";

export default function CustomerAccount() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/account');
  };

  const menuItems = [
    {
      title: "My Cart",
      description: "View and manage your rental cart. Check out your selected bikes and accessories.",
      icon: <ShoppingCart className="w-6 h-6" />,
      action: () => navigate("/cart"),
      height: "h-80"
    },
    {
      title: "Browse Bikes",
      description: "Explore our extensive collection of bikes. Find the perfect ride for your next adventure.",
      icon: <Bike className="w-6 h-6" />,
      action: () => navigate("/bikes"),
      height: "h-80"
    },
    {
      title: "Browse Accessories",
      description: "Discover premium accessories to enhance your riding experience. Safety gear, maintenance tools, and more.",
      icon: <Package className="w-6 h-6" />,
      action: () => navigate("/accessories"),
      height: "h-80"
    },
   
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center py-20 px-4 font-syne">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img className="w-full h-full object-cover" src={bg} alt="Background" />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl">
        {/* User Profile Section */}
        <div className="backdrop-blur-lg rounded-2xl p-8 mb-8 text-white border border-white border-opacity-20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white bg-opacity-10 rounded-full">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user?.username || 'Customer'}</h2>
              <p className="text-gray-300">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={item.action}
            >
              <div className={`${item.height} relative overflow-hidden rounded-2xl backdrop-blur-md border border-white border-opacity-20 transition-all duration-300 transform group-hover:scale-[1.02] group-hover:shadow-xl`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300"></div>
                <div className="relative h-full p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white bg-opacity-10 rounded-full">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-white text-opacity-80 flex-grow">{item.description}</p>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white bg-opacity-20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 backdrop-blur-md border border-red-500 border-opacity-50 text-red-500 px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-red-500 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
