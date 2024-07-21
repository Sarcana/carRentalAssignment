import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookings = ({ isAgency }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          return;
        }

        const response = await axios.get('https://developershashwat27.pythonanywhere.com/api/bookings/view/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const differenceInTime = end.getTime() - start.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays + 1; 
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-center">You have no bookings.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg shadow-md p-4 mb-4 bg-white">
              <div className="mb-2">
                <span className="font-bold">Car Model:</span> {booking.car.model}
              </div>
              <div className="mb-2">
                <span className="font-bold">Start Date:</span> {booking.start_date}
              </div>
              <div className="mb-2">
                <span className="font-bold">End Date:</span> {booking.end_date}
              </div>
              <div className="mb-2">
                <span className="font-bold">Total Days:</span> {calculateTotalDays(booking.start_date, booking.end_date)}
              </div>
              <div className="mb-2">
                <span className="font-bold">{isAgency ? 'Total Earnings:' : 'Total Cost:'}</span> {isAgency ? booking.total_cost : booking.total_cost.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
