import React, { useState } from "react";
import bg from "../../public/bg/bgcart.jpg";

export function Accounts() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen font-syne">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative bg-white text-black shadow-2xl p-10 rounded-lg w-5/12 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold mb-4">Create an Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 border-[3px] border-black rounded-2xl"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border-[3px] border-black rounded-2xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border-[3px] border-black rounded-2xl"
        />
        <button className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900">
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    { name: "Royal Enfield", rentPerDay: 1500 },
    { name: "KTM Duke 390", rentPerDay: 1200 },
  ]);

  const totalAmount = cartItems.reduce((total, item) => total + item.rentPerDay, 0);

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen font-syne">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative bg-white text-black shadow-2xl p-10 rounded-lg w-5/12 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
        <ul className="mb-6">
          {cartItems.map((item, index) => (
            <li key={index} className="p-3 border-b border-black font-semibold">
              {item.name} - ₹{item.rentPerDay}/day
            </li>
          ))}
        </ul>
        <h3 className="text-2xl font-semibold mb-4">Total: ₹{totalAmount}</h3>
        <button className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900">
          Checkout
        </button>
      </div>
    </div>
  );
}
