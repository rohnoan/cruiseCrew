import React from 'react';

export default function Receipt({ items, totalAmount, orderDetails, onClose }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-4">Order Receipt</h2>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Order Details:</h3>
          <p>Pickup Date: {formatDate(orderDetails.pickupDate)}</p>
          <p>Drop-off Date: {formatDate(orderDetails.dropoffDate)}</p>
          <p>Location: {orderDetails.location}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Items:</h3>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>₹{item.rent}/day</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between font-bold">
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
        >
          Close
        </button>
      </div>
    </div>
  );
} 