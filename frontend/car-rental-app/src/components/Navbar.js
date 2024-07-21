import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, isCustomer, isAgency, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('isCustomer');
        localStorage.removeItem('isAgency');
        setIsLoggedIn(false);
        navigate('/login');
    };

    return (
        <nav className="bg-blue-500 p-4 mb-12">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <div>
                        <Link to="/" className="text-gray-100 hover:text-gray-300 font-bold text-xl">Car Rental</Link>
                    </div>
                    <div className="space-x-4">
                        {isLoggedIn ? (
                            <>
                                {isAgency && (
                                    <Link to="/my-cars" className="text-gray-100 hover:text-gray-300">My Cars</Link>
                                )}
                                <Link to="/my-bookings" className="text-gray-100 hover:text-gray-300">My Bookings</Link>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-100 hover:text-gray-300 focus:outline-none"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/register" className="text-gray-100 hover:text-gray-300">Register</Link>
                                <Link to="/login" className="text-gray-100 hover:text-gray-300">Login</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
