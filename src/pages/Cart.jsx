import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Receipt from '../components/Receipt';
import bg from "../../public/bg/bgcart.jpg";

export default function Cart() {
  const { cart } = useCart();
  const [showReceipt, setShowReceipt] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    pickupDate: '',
    dropoffDate: '',
    location: ''
  });
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const totalAmount = cart.reduce((total, item) => total + item.rent, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    setShowReceipt(true);
    setShowCheckoutForm(false);
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
                <li key={index} className="flex items-center p-3 border-b border-black font-semibold">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                  <div>
                    <p className="text-lg">{item.name}</p>
                    <p className="text-gray-700">₹{item.rent}/day</p>
                  </div>
                </li>
              ))}
            </ul>
            <h3 className="text-2xl font-semibold mb-4">Total: ₹{totalAmount}</h3>
            
            {!showCheckoutForm ? (
              <button 
                onClick={() => setShowCheckoutForm(true)}
                className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
              >
                Proceed to Checkout
              </button>
            ) : (
              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Date</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    value={orderDetails.pickupDate}
                    onChange={(e) => setOrderDetails({...orderDetails, pickupDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Drop-off Date</label>
                  <input
                    type="date"
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    value={orderDetails.dropoffDate}
                    onChange={(e) => setOrderDetails({...orderDetails, dropoffDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Pickup Location</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter pickup location"
                    className="w-full p-3 border border-gray-300 rounded-xl"
                    value={orderDetails.location}
                    onChange={(e) => setOrderDetails({...orderDetails, location: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
                >
                  Complete Checkout
                </button>
              </form>
            )}
          </>
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <Receipt
          items={cart}
          totalAmount={totalAmount}
          orderDetails={orderDetails}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
}
