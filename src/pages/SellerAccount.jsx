import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bikes } from "../services/api";
import bg from "../../public/bg/bgaccounts.jpg";

export default function SellerAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");
  const [sellerBikes, setSellerBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newBike, setNewBike] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    fetchSellerBikes();
  }, []);

  const fetchSellerBikes = async () => {
    try {
      setLoading(true);
      const response = await bikes.getAll();
      setSellerBikes(response.data);
    } catch (err) {
      setError("Failed to fetch bikes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBike = async (e) => {
    e.preventDefault();
    try {
      await bikes.create(newBike);
      fetchSellerBikes();
      setNewBike({
        name: "",
        price: "",
        image: ""
      });
    } catch (err) {
      setError("Failed to add bike");
      console.error(err);
    }
  };

  const handleDeleteBike = async (bikeId) => {
    try {
      await bikes.delete(bikeId);
      fetchSellerBikes();
    } catch (err) {
      setError("Failed to delete bike");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/account');
  };

  return (
    <div className="relative flex flex-col justify-center w-full font-syne lg:h-screen">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative flex flex-col lg:bg-inherit text-slate-800 lg:ml-20 justify-center backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
        <h2 className="text-3xl font-bold mb-4 text-center">Seller Dashboard</h2>

        {/* Tabs */}
        <div className="flex justify-around border-b border-gray-500 pb-2 mb-4">
          {["products", "orders", "settings"].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-semibold ${
                activeTab === tab ? "border-b-2 border-white" : "text-gray-400"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <h3 className="text-xl font-bold mb-4">Add New Bike</h3>
            <form onSubmit={handleAddBike} className="space-y-4">
              <input
                type="text"
                placeholder="Bike Name"
                value={newBike.name}
                onChange={(e) => setNewBike({ ...newBike, name: e.target.value })}
                className="w-full p-3 text-gray-700 rounded-2xl border-[3px] border-black"
                required
              />
              
              <input
                type="number"
                placeholder="Price per day"
                value={newBike.price}
                onChange={(e) => setNewBike({ ...newBike, price: e.target.value })}
                className="w-full p-3 text-gray-700 rounded-2xl border-[3px] border-black"
                required
              />
              
              <input
                type="text"
                placeholder="Image URL"
                value={newBike.image}
                onChange={(e) => setNewBike({ ...newBike, image: e.target.value })}
                className="w-full p-3 text-gray-700 rounded-2xl border-[3px] border-black"
                required
              />
              <button
                type="submit"
                className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
              >
                Add Bike
              </button>
            </form>

            <h3 className="text-xl font-bold mt-6 mb-4">Your Bikes</h3>
            {loading ? (
              <p>Loading bikes...</p>
            ) : (
              <div className="space-y-4">
                {sellerBikes.map((bike) => (
                  <div
                    key={bike._id}
                    className="flex justify-between items-center p-4 bg-white bg-opacity-10 rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold">{bike.name}</h4>
                      <p className="text-sm">₹{bike.price}/day</p>
                    </div>
                    <button
                      onClick={() => handleDeleteBike(bike._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Orders Management</h3>
            <p>No orders yet.</p>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div>
            <h3 className="text-xl font-bold mb-2">Account Settings</h3>
            <button
              onClick={handleLogout}
              className="w-full bg-red-600 p-3 rounded-2xl text-white font-semibold hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}

        <button
          className="mt-6 w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
