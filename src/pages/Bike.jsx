import React, { useState, useRef, useEffect } from "react";
import { useJsApiLoader, StandaloneSearchBox } from "@react-google-maps/api";
import BikeCard from "../components/BikeCard";
import { bikes } from "../services/api";
import bg from "../../public/bg/bgfinall.jpg";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState(2000);
  const [sortOrder, setSortOrder] = useState("lowToHigh");
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [bikesList, setBikesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_KEY,
    libraries: ["places"],
  });

  const searchBoxRef = useRef(null);

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const response = await bikes.getAll();
      setBikesList(response.data);
    } catch (err) {
      setError("Failed to fetch bikes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      if (searchQuery.trim() === '') {
        // If search query is empty, fetch all bikes
        await fetchBikes();
      } else {
        const response = await bikes.search(searchQuery);
        setBikesList(response.data);
      }
    } catch (err) {
      setError("Failed to search bikes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      setLocation(places[0].formatted_address);
    }
  };

  // Filter and sort bikes
  const filteredBikes = bikesList
    .filter((bike) => bike.price <= priceRange)
    .sort((a, b) =>
      sortOrder === "lowToHigh" ? a.price - b.price : b.price - a.price
    );

  return (
    <div>
      <div className="relative justify-center flex flex-col w-full font-syne lg:h-screen">
        <img className="relative lg:absolute w-full h-full object-cover" src={bg} alt="Background" />
        <div className="relative flex lg:bg-inherit text-slate-800 lg:ml-20 justify-center flex-col backdrop-blur-sm lg:text-white shadow-2xl p-8 rounded-lg lg:w-5/12">
          {/* Search for Bike */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Get Your Bike Now</label>
            <input
              type="text"
              placeholder="Search for a bike..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full p-3 text-gray-700 rounded-2xl focus:ring-2 border-[3px] border-black"
            />
          </div>

          {/* Date Inputs */}
          <div className="flex flex-row">
            <div className="mb-2 w-1/2 mr-2">
              <label className="block font-semibold mb-1">Pickup Date</label>
              <input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full p-3 text-gray-700 border-[3px] border-black rounded-2xl focus:ring-2"
              />
            </div>
            <div className="mb-2 ml-2 w-1/2">
              <label className="block font-semibold mb-1">Drop-off Date</label>
              <input
                type="date"
                value={dropoffDate}
                onChange={(e) => setDropoffDate(e.target.value)}
                className="w-full p-3 border-[3px] border-black text-gray-700 rounded-2xl focus:ring-2"
              />
            </div>
          </div>

          {/* Location Search */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Location</label>
            {isLoaded ? (
              <StandaloneSearchBox
                onLoad={(ref) => (searchBoxRef.current = ref)}
                onPlacesChanged={onPlacesChanged}
              >
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="border-[3px] border-black text-gray-700 p-2 w-full rounded-2xl"
                />
              </StandaloneSearchBox>
            ) : (
              <p>Loading location search...</p>
            )}
          </div>

          {/* Price Range */}
          <div className="mb-2">
            <label className="block font-semibold mb-1">Price Range: ₹{priceRange}</label>
            <input
              type="range"
              min="1000"
              max="2000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full appearance-none h-2 bg-black rounded-2xl"
            />
          </div>

          {/* Sort Options */}
          <div className="text-gray-700 mb-2">
            <label className="block font-semibold text-white mb-1">Sort by Price</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-3 border-[3px] border-black rounded-2xl focus:ring-2"
            >
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </select>
          </div>

          <button 
            onClick={handleSearch}
            className="w-full bg-black p-3 rounded-2xl text-white font-semibold hover:bg-gray-900"
          >
            Search
          </button>
        </div>
      </div>

      {/* Display Bikes */}
      <div className="bg-white mt-20 min-h-screen">
        {error && (
          <div className="text-red-500 text-center p-4">{error}</div>
        )}
        {loading ? (
          <div className="text-center p-4">Loading bikes...</div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {filteredBikes.map((bike) => (
              <div key={bike._id} className="m-3">
                <BikeCard
                  name={bike.name}
                  rent={bike.price}
                  image={bike.image}
                  description={bike.description}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

