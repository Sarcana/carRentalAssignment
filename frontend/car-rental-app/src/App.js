import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import AddCar from './components/AddCar';
import AvailableCars from './components/AvailableCars';
import Navbar from './components/Navbar';
import MyCars from './components/MyCars';
import MyBookings from './components/MyBookings';
import NotFound from './components/NotFound';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isCustomer, setIsCustomer] = useState(false);
    const [isAgency, setIsAgency] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);

            const storedIsCustomer = localStorage.getItem('isCustomer') === 'true';
            const storedIsAgency = localStorage.getItem('isAgency') === 'true';

            setIsCustomer(storedIsCustomer);
            setIsAgency(storedIsAgency);
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} isCustomer={isCustomer} isAgency={isAgency} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route exact path="/" element={<AvailableCars isLoggedIn={isLoggedIn} isCustomer={isCustomer} />} />
                <Route path="/my-cars" element={<MyCars isLoggedIn={isLoggedIn} isAgency={isAgency} />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login/" element={<Login setIsLoggedIn={setIsLoggedIn} setIsAgency={setIsAgency} setIsCustomer={setIsCustomer} />} />
                <Route path="/add-car" element={<AddCar />} />
                <Route path="/my-bookings" element={<MyBookings isLoggedIn={isLoggedIn} isCustomer={isCustomer} isAgency={isAgency} />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
