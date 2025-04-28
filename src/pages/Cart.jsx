import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Receipt from '../components/Receipt';
import bg from "../../public/bg/bgcart.jpg";
import { X, Printer } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    pickupDate: '',
    dropoffDate: '',
    location: ''
  });
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const calculateTotalAmount = (days) => {
    return cart.reduce((total, item) => total + (item.rent * days), 0);
  };

  const handleRemoveItem = (index) => {
    removeFromCart(index);
  };

  const validateDates = () => {
    const newErrors = {};
    const pickupDate = new Date(orderDetails.pickupDate);
    const dropoffDate = new Date(orderDetails.dropoffDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!orderDetails.pickupDate) {
      newErrors.pickupDate = 'Pickup date is required';
    } else if (pickupDate < today) {
      newErrors.pickupDate = 'Pickup date cannot be in the past';
    }

    if (!orderDetails.dropoffDate) {
      newErrors.dropoffDate = 'Drop-off date is required';
    } else if (dropoffDate <= pickupDate) {
      newErrors.dropoffDate = 'Drop-off date must be after pickup date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (validateDates()) {
      const pickupDate = new Date(orderDetails.pickupDate);
      const dropoffDate = new Date(orderDetails.dropoffDate);
      const totalDays = Math.ceil((dropoffDate - pickupDate) / (1000 * 60 * 60 * 24));
      const totalAmount = calculateTotalAmount(totalDays);
      
      setShowReceipt(true);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    clearCart();
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center py-10 justify-center w-full font-syne">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative bg-white text-black shadow-2xl p-10 rounded-lg w-11/12 md:w-5/12 backdrop-blur-lg bg-opacity-90">
        <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
        
        {cart.length > 0 ? (
          <>
            <ul className="mb-6 space-y-4">
              {cart.map((item, index) => (
                <li key={index} className="flex items-center justify-between p-3 border-b border-black font-semibold">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                    <div>
                      <p className="text-lg">{item.name}</p>
                      <p className="text-gray-700">₹{item.rent}/day</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200"
                  >
                    <X size={20} />
                  </button>
                </li>
              ))}
            </ul>
            
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pickup Date</label>
                <input
                  type="date"
                  min={today}
                  value={orderDetails.pickupDate}
                  onChange={(e) => setOrderDetails({...orderDetails, pickupDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.pickupDate && <p className="text-red-500 text-sm mt-1">{errors.pickupDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Drop-off Date</label>
                <input
                  type="date"
                  min={orderDetails.pickupDate || today}
                  value={orderDetails.dropoffDate}
                  onChange={(e) => setOrderDetails({...orderDetails, dropoffDate: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                {errors.dropoffDate && <p className="text-red-500 text-sm mt-1">{errors.dropoffDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  value={orderDetails.location}
                  onChange={(e) => setOrderDetails({...orderDetails, location: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
              >
                Checkout
              </button>
            </form>
          </>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <Receipt
          items={cart}
          totalAmount={calculateTotalAmount(Math.ceil((new Date(orderDetails.dropoffDate) - new Date(orderDetails.pickupDate)) / (1000 * 60 * 60 * 24)))}
          orderDetails={orderDetails}
          onClose={handleCloseReceipt}
          onPrint={handlePrintReceipt}
        />
      )}
    </div>
  );
}
