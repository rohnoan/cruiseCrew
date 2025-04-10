import { useCart } from '../context/CartContext'
import { useState } from 'react';

export default function BikeCard({ image, name, rent, rating }) {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = () => {
    addToCart({ image, name, rent, rating });
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg">
      {/* Popup */}
      {showPopup && (
        <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded shadow-md text-sm z-10">
          1 item added to cart
        </div>
      )}

      {/* Image Container */}
      <div className="relative">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        {/* Rating Badge */}
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-stone-700 px-2 py-1 text-xs font-semibold text-white">
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          {rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Available for daily rental
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 pt-0">
        <div className="text-lg font-bold text-gray-900">
          <span className="text-2xl">₹{rent}</span>
          <span className="text-sm text-gray-600">/day</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
