import React from 'react';
import { Printer, X } from 'lucide-react';

export default function Receipt({ items, totalAmount, orderDetails, onClose, onPrint }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalDays = Math.ceil((new Date(orderDetails.dropoffDate) - new Date(orderDetails.pickupDate)) / (1000 * 60 * 60 * 24));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 print:shadow-none print:border print:border-gray-300">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <h2 className="text-2xl font-bold">Order Receipt</h2>
          <div className="flex gap-2">
            <button
              onClick={onPrint}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              title="Print Receipt"
            >
              <Printer size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              title="Close"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Order Details:</h3>
          <p>Pickup Date: {formatDate(orderDetails.pickupDate)}</p>
          <p>Drop-off Date: {formatDate(orderDetails.dropoffDate)}</p>
          <p>Rental Duration: {totalDays} days</p>
          <p>Location: {orderDetails.location}</p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Items:</h3>
          {items.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <div>
                <span className="font-medium">{item.name}</span>
                <p className="text-sm text-gray-600">₹{item.rent}/day × {totalDays} days</p>
              </div>
              <span className="font-medium">₹{item.rent * totalDays}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between font-bold text-lg">
            <span>Total Amount:</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 print:hidden">
          <p>Thank you for your order!</p>
          <p>Please keep this receipt for your records.</p>
        </div>
      </div>
    </div>
  );
} 