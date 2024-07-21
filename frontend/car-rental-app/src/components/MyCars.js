import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const MyCars = ({ isLoggedIn, isAgency }) => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn || !isAgency) {
            navigate('/');
            return;
        }

        const fetchCars = async () => {
            try {
                const response = await axios.get('https://developershashwat27.pythonanywhere.com/api/cars/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setCars(response.data); // Assuming response.data is an array of cars
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setLoading(false);
            }
        };

        fetchCars();
    }, [isLoggedIn, isAgency, navigate]);

    if (!isLoggedIn || !isAgency) {
        return null; 
    }

    if (loading) {
        return <p>Loading...</p>; 
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">My Cars</h2>
                    <Link to="/add-car" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        Add Car
                    </Link>
                </div>
                {cars.length === 0 ? (
                    <p className="text-center">No cars found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {cars.map(car => (
                            <div key={car.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                                <h3 className="text-xl font-bold">{car.model}</h3>
                                <p className="text-gray-600">Vehicle Number: {car.vehicle_number}</p>
                                <p className="text-gray-600">Seating Capacity: {car.seating_capacity}</p>
                                <p className="text-gray-600">Rent per Day: {car.rent_per_day}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCars;
