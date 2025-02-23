import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../public/bg/bgaccounts.jpg";

export default function Account() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState("customer"); // Default is Customer
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountTypeChange = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Logging in" : "Signing up", formData);
    
    // Redirect to Seller or Customer page
    navigate(`/${selectedAccount}`);
  };

  return (
    <div className="relative flex flex-col justify-center w-full font-syne lg:h-screen">
      <img
        className="relative lg:absolute w-full h-full object-cover"
        src={bg}
        alt="Background"
      />
      <div className="relative flex lg:bg-inherit text-slate-800 lg:ml-20 justify-center flex-col backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

        {/* Login/Signup Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-2">
              <label className="block font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 text-gray-700 border-[3px] border-black rounded-2xl focus:ring-2"
              />
            </div>
          )}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-3 text-gray-700 border-[3px] border-black rounded-2xl focus:ring-2"
            />
          </div>
          <div className="mb-2">
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full p-3 text-gray-700 border-[3px] border-black rounded-2xl focus:ring-2"
            />
          </div>
          <div className="text-gray-700 mb-2">
            <label className="block font-semibold text-white mb-1">Select Account Type</label>
            <select
              className="w-full p-3 border-[3px] border-black rounded-2xl focus:ring-2"
              value={selectedAccount}
              onChange={handleAccountTypeChange}
            >
              <option value="seller">Seller</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? " Sign up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
