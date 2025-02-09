import React, { useState, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

function AddressInputWithAutocomplete() {
  const [address, setAddress] = useState('');
  const inputRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ['places'], // Load the places library for autocomplete
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(address); // Handle the form submission
  };

  const handlePlaceSelect = () => {
    const place = inputRef.current?.value;
    setAddress(place);
  };

  const loadAutocomplete = () => {
    if (isLoaded && inputRef.current) {
      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
      autocomplete.setFields(['address_components', 'formatted_address']);
      autocomplete.addListener('place_changed', handlePlaceSelect);
    }
  };

  // Wait for Google Maps API to load
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="text-4xl font-syne w-full max-w-lg mx-auto space-y-4">
      <div className="flex font-syne flex-col">
        <input
          ref={inputRef}
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={loadAutocomplete}
          className="border font-syne border-gray-300 rounded-md p-2 mt-1 w-full"
          placeholder="enter your address"
          required
        />
      </div>

      <button
        type="submit"
        className="font-syne w-full py-2 mb-10 text-4xl  bg-[#4a089a] bg-gradient-to-r from-[#7DD6FF] text-white rounded-md mt-4 "
      >
        Submit Address
      </button>
    </form>
  );
}

export default AddressInputWithAutocomplete;
