import React from 'react';

export default function Receipt({ items, totalAmount, onClose, orderDetails }) {
  const today = new Date();
  const orderNumber = Math.random().toString(36).substr(2, 9).toUpperCase();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 print:p-0">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 print:shadow-none print:p-4">
        {/* Receipt Header */}
        <div className="text-center border-b pb-4 mb-4">
          <h2 className="text-3xl font-bold text-gray-800">RIDE RENTALS</h2>
          <p className="text-gray-600">Order Receipt</p>
          <p className="text-sm text-gray-500">Order #: {orderNumber}</p>
          <p className="text-sm text-gray-500">
            Date: {today.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Rental Details:</h3>
          <p>Pickup Date: {orderDetails?.pickupDate || 'Not specified'}</p>
          <p>Drop-off Date: {orderDetails?.dropoffDate || 'Not specified'}</p>
          <p>Location: {orderDetails?.location || 'Not specified'}</p>
        </div>

        {/* Items Table */}
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Item</th>
              <th className="text-right py-2">Price/Day</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-2">{item.name}</td>
                <td className="text-right py-2">₹{item.rent}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="font-bold">
              <td className="py-2">Total Amount</td>
              <td className="text-right py-2">₹{totalAmount}</td>
            </tr>
          </tfoot>
        </table>

        {/* Terms and Conditions */}
        <div className="text-xs text-gray-500 mb-6">
          <p className="mb-2">Terms and Conditions:</p>
          <ul className="list-disc pl-4">
            <li>Security deposit will be refunded after bike inspection</li>
            <li>Please return the bike in the same condition</li>
            <li>Fuel charges are not included in the rental price</li>
            <li>Valid ID proof is required at the time of pickup</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Print Receipt
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 