import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../public/bg/bgaccounts.jpg";

export default function CustomerAccount() {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col justify-center w-full font-syne lg:h-screen">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative flex flex-col gap-4 lg:bg-inherit text-slate-100 lg:ml-20 justify-center backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
        <h2 className="text-3xl font-bold mb-6 text-center">Customer Account</h2>

        {/* Buttons */}
        <button
          className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
          onClick={() => navigate("/cart")}
        >
          Cart
        </button>

        <button
          className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
          onClick={() => navigate("/bikes")}
        >
          Bikes
        </button>

        <button
          className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
          onClick={() => navigate("/accessories")}
        >
          Accessories
        </button>

        <button
          className="w-full bg-red-600 p-3 rounded-2xl text-white font-semibold hover:bg-red-700"
          onClick={() => navigate("/")}
        >
          Logout
        </button>

      </div>
    </div>
  );
}
