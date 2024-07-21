import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isCustomer, setIsCustomer] = useState(false);
    const [isAgency, setIsAgency] = useState(false);
    const [message, setMessage] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleEmailBlur = () => {
        if (email && !validateEmail(email)) {
            setEmailError('Invalid email');
        } else {
            setEmailError('');
        }
    };

    const handlePasswordBlur = () => {
        if (password && !validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleCustomerChange = () => {
        if (!isCustomer) {
            setIsCustomer(true);
            setIsAgency(false);
        }
    };

    const handleAgencyChange = () => {
        if (!isAgency) {
            setIsAgency(true);
            setIsCustomer(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError('Invalid email');
            return;
        }

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }
        const user = { username, email, password };

        try {
            let registrationEndpoint = '';
            if (isCustomer) {
                registrationEndpoint = 'https://developershashwat27.pythonanywhere.com/api/users/register/customer/';
            } else if (isAgency) {
                registrationEndpoint = 'https://developershashwat27.pythonanywhere.com/api/users/register/agency/';
            }

            const response = await axios.post(registrationEndpoint, user);

            setUsername('');
            setEmail('');
            setPassword('');
            setMessage('Registration successful. Redirecting to login...');

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            
            if (error.response && error.response.status === 400) {
                const { data } = error.response;

                
                if (data.username && data.username.length > 0) {
                    setUsernameError(data.username[0]);
                } else {
                    setUsernameError('');
                }

               
                if (data.email && data.email.length > 0) {
                    setEmailError(data.email[0]);
                } else {
                    setEmailError('');
                }

               
                if (data.password && data.password.length > 0) {
                    setPasswordError(data.password[0]);
                } else {
                    setPasswordError('');
                }
            } else {
                
                console.error('Registration failed:', error);
                setMessage('Registration failed. Please try again later.');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${usernameError ? 'border-red-500' : ''}`}
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${emailError ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        required
                    />
                    {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${passwordError ? 'border-red-500' : ''}`}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={handlePasswordBlur}
                        required
                    />
                    {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isCustomer"
                        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                        checked={isCustomer}
                        onChange={handleCustomerChange}
                    />
                    <label htmlFor="isCustomer" className="text-sm text-gray-700">Customer</label>
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        id="isAgency"
                        className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                        checked={isAgency}
                        onChange={handleAgencyChange}
                    />
                    <label htmlFor="isAgency" className="text-sm text-gray-700">Car Rental Agency</label>
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Register
                    </button>
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already registered? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
            </p>
        </div>
    );
};

export default Register;
