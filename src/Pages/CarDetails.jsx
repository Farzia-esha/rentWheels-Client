import { useEffect, useState } from "react";
import { useParams } from "react-router";

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/cars/${id}`)
      .then(res => res.json())
      .then(data => setCar(data));
  }, [id]);

  if (!car) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <img src={car.imageUrl} alt={car.carName} className="w-full rounded-xl shadow-md" />

        <div>
          <h1 className="text-3xl font-bold">{car.carName}</h1>
          <p className="text-gray-600 mt-2">{car.description}</p>

          <div className="mt-6 space-y-2 text-lg">
            <p><strong>Category:</strong> {car.category}</p>
            <p><strong>Location:</strong> {car.location}</p>
            <p className="text-green-600 font-bold text-2xl">${car.rentPrice}/day</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
