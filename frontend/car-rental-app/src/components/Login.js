import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn, setIsAgency, setIsCustomer }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handlePasswordBlur = () => {
        if (password && !validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long');
        } else {
            setPasswordError('');
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setPasswordError('Password must be at least 6 characters long');
            return;
        }

        const user = { username, password };
        try {
            const response = await axios.post('https://developershashwat27.pythonanywhere.com/api/users/login/', user);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const user_data = await axios.get('https://developershashwat27.pythonanywhere.com/api/users/user_details', {
                headers: {
                    'Authorization': `Bearer ${response.data.access}`,
                }
            });
            if (user_data.data[0].is_customer) {
                localStorage.setItem('isCustomer', 'true');
                setIsCustomer(true);
            } else {
                localStorage.removeItem('isCustomer');
                setIsCustomer(false);
            }
            if (user_data.data[0].is_agency) {
                localStorage.setItem('isAgency', 'true');
                setIsAgency(true);
            } else {
                localStorage.removeItem('isAgency');
                setIsAgency(false);
            }
            setIsLoggedIn(true);
            navigate('/');
        } catch (error) {
            console.error(error);
            if (error.response) {
                if (error.response.status === 400 && error.response.data.detail === "No active account found with the given credentials") {
                    setMessage('No active account found with the given credentials');
                } else {
                    setMessage('Invalid credentials');
                }
            } else {
                setMessage('Login failed');
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            {message && <p className="text-red-500 text-sm mb-4 text-center">{message}</p>}
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
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
                <div className="text-center">
                    <button
                        type="submit"
                        className="inline-block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Login
                    </button>
                </div>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Not registered yet? <Link to="/register" className="text-blue-500 hover:underline">Register here</Link>
            </p>
        </div>
    );
};

export default Login;
