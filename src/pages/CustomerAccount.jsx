import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../public/bg/bgaccounts.jpg";

export default function CustomerAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="relative flex flex-col justify-center w-full font-syne lg:h-screen">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative flex flex-col lg:bg-inherit text-slate-100 lg:ml-20 justify-center backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
        <h2 className="text-3xl font-bold mb-4 text-center">Customer Account</h2>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-500 pb-2 mb-4">
          {["profile", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${activeTab === tab ? "border-b-2 border-white" : "text-gray-100"}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Profile Information</h3>
            <p><strong>Name:</strong> John Doe</p>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Joined:</strong> January 2023</p>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Order History</h3>
            <ul>
              <li>✅ Order #12345 - Delivered</li>
              <li>🚚 Order #12346 - In Transit</li>
              <li>📦 Order #12347 - Processing</li>
            </ul>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Account Settings</h3>
            <button className="w-full bg-red-600 p-3 rounded-2xl text-white font-semibold hover:bg-red-700">
              Logout
            </button>
          </div>
        )}

        <button className="mt-6 w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
