import React, { useEffect, useState } from 'react';

const Motorbikes = () => {
  const [motorbikes, setMotorbikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMotorbikes = async () => {
      try {
        const make = 'Kawasaki'; // Example make
        const model = 'Ninja'; // Example model
        const year = '2022';   // Example year

        const url = `https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}&year=${year}`;

        const response = await fetch(url, {
          headers: {
            'X-Api-Key': 'OuDeHTWP6PJusF+5RAeRVg==BtKsiuc3GH9uuQyO'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch motorbikes');
        }

        const data = await response.json();
        console.log(data); // Log the response data for debugging

        setMotorbikes(data); // Set the fetched motorbike data
        setLoading(false); // Set loading to false
      } catch (error) {
        setError(error.message); // Set error message if request fails
        setLoading(false);
      }
    };

    fetchMotorbikes();
  }, []);

  if (loading) return <p>Loading motorbikes...</p>; // Loading state
  if (error) return <p>Error: {error}</p>; // Error state
  if (motorbikes.length === 0) return <p>No motorbikes found matching your criteria.</p>; // No data state

  return (
    <div className="motorbikes">
      <h2>Motorbikes for Sale & Rent</h2>
      <div className="motorbike-list">
        {motorbikes.map((motorbike, index) => (
          <div key={index} className="motorbike-card">
            <h3>{motorbike.make} {motorbike.model}</h3>
            <p><strong>Year:</strong> {motorbike.year}</p>
            <p><strong>Type:</strong> {motorbike.type}</p>
            <p><strong>Displacement:</strong> {motorbike.displacement}</p>
            <p><strong>Engine:</strong> {motorbike.engine}</p>
            <p><strong>Compression:</strong> {motorbike.compression}</p>
            <p><strong>Bore Stroke:</strong> {motorbike.bore_stroke}</p>
            <p><strong>Fuel System:</strong> {motorbike.fuel_system}</p>
            <p><strong>Fuel Control:</strong> {motorbike.fuel_control}</p>
            <p><strong>Lubrication:</strong> {motorbike.lubrication}</p>
            <p><strong>Cooling:</strong> {motorbike.cooling}</p>
            <p><strong>Gearbox:</strong> {motorbike.gearbox}</p>
            <button>Rent Now</button>
            <button>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Motorbikes;
