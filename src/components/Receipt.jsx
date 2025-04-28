import React, { useState, useEffect } from 'react';

export default function Receipt({ items, orderDetails, onClose }) {
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (orderDetails.pickupDate && orderDetails.dropoffDate) {
      const pickup = new Date(orderDetails.pickupDate);
      const dropoff = new Date(orderDetails.dropoffDate);
      const days = Math.ceil((dropoff - pickup) / (1000 * 60 * 60 * 24));
      setTotalDays(days);

      // Calculate total amount for all items multiplied by days
      const amount = items.reduce((total, item) => total + (item.rent * days), 0);
      setTotalAmount(amount);
    }
  }, [items, orderDetails]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Rental Receipt</h2>
        
        <div className="mb-4">
          <p><strong>Pickup Date:</strong> {orderDetails.pickupDate}</p>
          <p><strong>Drop-off Date:</strong> {orderDetails.dropoffDate}</p>
          <p><strong>Total Days:</strong> {totalDays}</p>
          <p><strong>Location:</strong> {orderDetails.location}</p>
        </div>

        <div className="border-t border-b py-4 my-4">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>₹{item.rent} × {totalDays} days = ₹{item.rent * totalDays}</span>
            </div>
          ))}
        </div>

        <div className="text-xl font-bold">
          Total Amount: ₹{totalAmount}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full bg-black text-white p-3 rounded-lg hover:bg-gray-900"
        >
          Close
        </button>
      </div>
    </div>
  );
} 