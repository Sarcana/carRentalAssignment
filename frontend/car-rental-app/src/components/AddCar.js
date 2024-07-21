import React, { useState } from 'react';
import axios from 'axios';

const AddCar = () => {
  const [model, setModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [rentPerDay, setRentPerDay] = useState('');

  const handleAddCar = async (e) => {
    e.preventDefault();
    const car = {
      model,
      vehicle_number: vehicleNumber,
      seating_capacity: seatingCapacity,
      rent_per_day: rentPerDay
    };
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://developershashwat27.pythonanywhere.com/api/cars/', car, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      alert('Car added successfully');
      window.location.href = '/my-cars'; // Redirect to MyCars page after successful addition
    } catch (error) {
      console.error(error);
      alert('Failed to add car');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Car</h2>
      <form onSubmit={handleAddCar} className="space-y-4">
        <div>
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
          <input
            type="text"
            id="model"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter car model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700">Vehicle Number:</label>
          <input
            type="text"
            id="vehicleNumber"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter vehicle number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="seatingCapacity" className="block text-sm font-medium text-gray-700">Seating Capacity:</label>
          <input
            type="number"
            id="seatingCapacity"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter seating capacity"
            value={seatingCapacity}
            onChange={(e) => setSeatingCapacity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="rentPerDay" className="block text-sm font-medium text-gray-700">Rent per Day:</label>
          <input
            type="number"
            id="rentPerDay"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter rent per day"
            value={rentPerDay}
            onChange={(e) => setRentPerDay(e.target.value)}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="inline-block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
