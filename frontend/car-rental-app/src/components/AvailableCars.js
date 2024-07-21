import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableCars = ({ isLoggedIn, isCustomer }) => {
  const [cars, setCars] = useState([]);
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://developershashwat27.pythonanywhere.com/api/cars/');
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);

  const handleRentCar = async (carId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(startDateObj.getTime() + days * 24 * 60 * 60 * 1000);
    const endDate = endDateObj.toISOString().split('T')[0]; 

    try {
      const booking = {
        car: carId,
        start_date: startDate,
        end_date: endDate,
        days: days
      };

      await axios.post('https://developershashwat27.pythonanywhere.com/api/bookings/', booking, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Car booked successfully');
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error booking car:', error);
      alert('Failed to book car');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Available Cars</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map((car) => (
          <li key={car.id} className="border rounded-lg shadow-md p-4 mb-4 bg-white">
            <div className="mb-2">
              <span className="font-bold">Model:</span> {car.model}
            </div>
            <div className="mb-2">
              <span className="font-bold">Vehicle Number:</span> {car.vehicle_number}
            </div>
            <div className="mb-2">
              <span className="font-bold">Seating Capacity:</span> {car.seating_capacity}
            </div>
            <div className="mb-2">
              <span className="font-bold">Rent per Day:</span> {car.rent_per_day}
            </div>
            {isLoggedIn && isCustomer && (
              <>
                <div className="mb-2">
                  <label className="font-bold">Days:</label>
                  <select
                    className="ml-2 border rounded px-3 py-1"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                  >
                    {[...Array(30).keys()].map((day) => (
                      <option key={day + 1} value={day + 1}>
                        {day + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="font-bold">Start Date:</label>
                  <input
                    type="date"
                    className="ml-2 border rounded px-3 py-1"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => handleRentCar(car.id)}
                >
                  Rent Car
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableCars;
