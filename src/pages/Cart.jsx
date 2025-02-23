import { useCart } from '../context/CartContext';
import bg from "../../public/bg/bgcart.jpg";

export default function Cart() {
  const { cart } = useCart(); // Get cart items from context

  const totalAmount = cart.reduce((total, item) => total + item.rent, 0);

  return (
    <div className="relative h-full flex flex-col items-center py-10 justify-center w-full  font-syne">
      <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
      <div className="relative bg-white text-black shadow-2xl p-10 rounded-lg w-5/12 backdrop-blur-lg">
        <h2 className="text-3xl font-semibold mb-4">Your Cart</h2>
        <ul className="mb-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <li key={index} className="flex items-center p-3 border-b border-black font-semibold">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg mr-4" />
                <div>
                  <p className="text-lg">{item.name}</p>
                  <p className="text-gray-700">₹{item.rent}/day</p>
                </div>
              </li>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty.</p>
          )}
        </ul>
        <h3 className="text-2xl font-semibold mb-4">Total: ₹{totalAmount}</h3>
        <button className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900">
          Checkout
        </button>
      </div>
    </div>
  );
}
