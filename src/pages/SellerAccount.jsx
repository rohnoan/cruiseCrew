import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bikes, accessories } from "../services/api";
import bg from "../../public/bg/bgaccounts.jpg";
import Navbar from "../components/Navbar";

export default function SellerAccount() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("bikes");
  const [sellerBikes, setSellerBikes] = useState([]);
  const [sellerAccessories, setSellerAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [newBike, setNewBike] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  const [newAccessory, setNewAccessory] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    if (activeTab === "bikes") {
      fetchSellerBikes();
    } else if (activeTab === "accessories") {
      fetchSellerAccessories();
    }
  }, [activeTab]);

  const fetchSellerBikes = async () => {
    try {
      setLoading(true);
      const response = await bikes.getSellerBikes();
      setSellerBikes(response.data);
    } catch (err) {
      setError("Failed to fetch bikes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerAccessories = async () => {
    try {
      setLoading(true);
      const response = await accessories.getAll();
      setSellerAccessories(response.data);
    } catch (err) {
      setError("Failed to fetch accessories");
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
        description: "",
        price: "",
        category: "",
        image: ""
      });
    } catch (err) {
      setError("Failed to add bike");
      console.error(err);
    }
  };

  const handleAddAccessory = async (e) => {
    e.preventDefault();
    try {
      await accessories.create(newAccessory);
      fetchSellerAccessories();
      setNewAccessory({
        name: "",
        description: "",
        price: "",
        category: "",
        image: ""
      });
    } catch (err) {
      setError("Failed to add accessory");
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

  const handleDeleteAccessory = async (accessoryId) => {
    try {
      await accessories.delete(accessoryId);
      fetchSellerAccessories();
    } catch (err) {
      setError("Failed to delete accessory");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/account');
  };

  return (
    <div className="relative">
      <Navbar />
      
      {/* Background Image */}
      <img 
        className="fixed inset-0 w-full h-full object-cover" 
        src={bg} 
        alt="Background" 
      />
      
      {/* Main Content */}
      <div className="relative min-h-screen pt-20">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar */}
          <div className="md:w-64 bg-black bg-opacity-70 text-white p-6">
            <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
            <nav className="space-y-2">
              {["bikes", "accessories", "orders", "settings"].map((tab) => (
                <button
                  key={tab}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab 
                      ? "bg-white text-black" 
                      : "text-white hover:bg-white hover:bg-opacity-10"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 md:p-8 overflow-auto">
            <div className="max-w-4xl mx-auto">
              {error && (
                <div className="bg-red-500 text-white p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Content Sections */}
              <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
                {/* Bikes Tab */}
                {activeTab === "bikes" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Add New Bike</h3>
                      <form onSubmit={handleAddBike} className="space-y-4">
                        <input
                          type="text"
                          placeholder="Bike Name"
                          value={newBike.name}
                          onChange={(e) => setNewBike({ ...newBike, name: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <textarea
                          placeholder="Description"
                          value={newBike.description}
                          onChange={(e) => setNewBike({ ...newBike, description: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="number"
                            placeholder="Price per day"
                            value={newBike.price}
                            onChange={(e) => setNewBike({ ...newBike, price: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            value={newBike.category}
                            onChange={(e) => setNewBike({ ...newBike, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={newBike.image}
                          onChange={(e) => setNewBike({ ...newBike, image: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900"
                        >
                          Add Bike
                        </button>
                      </form>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Your Bikes</h3>
                      {loading ? (
                        <p>Loading bikes...</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sellerBikes.map((bike) => (
                            <div
                              key={bike._id}
                              className="bg-white p-4 rounded-lg shadow border border-gray-200"
                            >
                              <img
                                src={bike.image}
                                alt={bike.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                              />
                              <h4 className="font-semibold text-lg">{bike.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{bike.description}</p>
                              <div className="flex justify-between items-center">
                                <p className="font-bold">₹{bike.price}/day</p>
                                <button
                                  onClick={() => handleDeleteBike(bike._id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Accessories Tab */}
                {activeTab === "accessories" && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Add New Accessory</h3>
                      <form onSubmit={handleAddAccessory} className="space-y-4">
                        <input
                          type="text"
                          placeholder="Accessory Name"
                          value={newAccessory.name}
                          onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <textarea
                          placeholder="Description"
                          value={newAccessory.description}
                          onChange={(e) => setNewAccessory({ ...newAccessory, description: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <input
                            type="number"
                            placeholder="Price per day"
                            value={newAccessory.price}
                            onChange={(e) => setNewAccessory({ ...newAccessory, price: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                          />
                          <input
                            type="text"
                            placeholder="Category"
                            value={newAccessory.category}
                            onChange={(e) => setNewAccessory({ ...newAccessory, category: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Image URL"
                          value={newAccessory.image}
                          onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          required
                        />
                        <button
                          type="submit"
                          className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900"
                        >
                          Add Accessory
                        </button>
                      </form>
                    </div>

                    <div className="mt-8">
                      <h3 className="text-xl font-bold mb-4">Your Accessories</h3>
                      {loading ? (
                        <p>Loading accessories...</p>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {sellerAccessories.map((accessory) => (
                            <div
                              key={accessory._id}
                              className="bg-white p-4 rounded-lg shadow border border-gray-200"
                            >
                              <img
                                src={accessory.image}
                                alt={accessory.name}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                              />
                              <h4 className="font-semibold text-lg">{accessory.name}</h4>
                              <p className="text-gray-600 text-sm mb-2">{accessory.description}</p>
                              <div className="flex justify-between items-center">
                                <p className="font-bold">₹{accessory.price}/day</p>
                                <button
                                  onClick={() => handleDeleteAccessory(accessory._id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Orders Management</h3>
                    <p>No orders yet.</p>
                  </div>
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Account Settings</h3>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 text-white p-3 rounded-lg hover:bg-red-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
