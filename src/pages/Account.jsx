import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import bg from "../../public/bg/bgaccounts.jpg";
import { useAuth } from '../context/AuthContext';

export default function Account() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer'
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const hasMinLength = password.length >= 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[@$!%*?&]/.test(password);

        return {
            isValid: hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar,
            errors: {
                length: !hasMinLength ? 'Must be at least 8 characters' : null,
                uppercase: !hasUpperCase ? 'Must contain an uppercase letter' : null,
                lowercase: !hasLowerCase ? 'Must contain a lowercase letter' : null,
                number: !hasNumber ? 'Must contain a number' : null,
                special: !hasSpecialChar ? 'Must contain a special character (@$!%*?&)' : null
            }
        };
    };

    const validateUsername = (username) => {
        return username.length >= 3 && username.length <= 30;
    };

    // Handle input changes with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear previous errors for this field
        setErrors(prev => ({ ...prev, [name]: null }));

        // Validate fields as user types
        if (name === 'email' && value) {
            if (!validateEmail(value)) {
                setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
            }
        }
        
        if (name === 'password' && value) {
            const passwordValidation = validatePassword(value);
            if (!passwordValidation.isValid) {
                setErrors(prev => ({ 
                    ...prev, 
                    password: Object.values(passwordValidation.errors).filter(Boolean)
                }));
            }
        }

        if (name === 'username' && value && !isLogin) {
            if (!validateUsername(value)) {
                setErrors(prev => ({ ...prev, username: 'Username must be between 3 and 30 characters' }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        
        try {
            if (isLogin) {
                // Login
                const response = await auth.login({
                    email: formData.email,
                    password: formData.password
                });
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    login(response.data.user);
                    navigate(response.data.user.role === 'seller' ? '/seller' : '/customer');
                }
            } else {
                // Register
                const response = await auth.register({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                });
                
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    login(response.data.user);
                    navigate(response.data.user.role === 'seller' ? '/seller' : '/customer');
                }
            }
        } catch (err) {
            console.error('Auth error:', err);
            setErrors({
                form: err.response?.data?.message || 'Authentication failed. Please try again.'
            });
        } finally {
            setLoading(false);
        }
    };

    // Reset form when switching between login and signup
    const toggleAuthMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            username: '',
            email: '',
            password: '',
            role: 'customer'
        });
        setErrors({});
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center w-full font-syne py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <img className="absolute w-full h-full object-cover -z-10" src={bg} alt="Background" />
            
            <div className="relative w-full max-w-md z-[100]">
                <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex mb-0">
                        <button
                            type="button"
                            className={`w-1/2 p-4 text-center ${isLogin ? 'bg-white text-black' : 'text-white'} transition-all duration-300`}
                            onClick={() => toggleAuthMode()}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`w-1/2 p-4 text-center ${!isLogin ? 'bg-white text-black' : 'text-white'} transition-all duration-300`}
                            onClick={() => toggleAuthMode()}
                        >
                            Sign Up
                        </button>
                    </div>

                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h2>

                        {errors.form && (
                            <div className="text-red-400 text-sm text-center mb-4">
                                {errors.form}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div>
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className={`w-full p-4 bg-white bg-opacity-20 rounded-xl border ${
                                            errors.username ? 'border-red-500' : 'border-white'
                                        } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white`}
                                        required
                                    />
                                    {errors.username && (
                                        <p className="mt-1 text-red-400 text-sm">{errors.username}</p>
                                    )}
                                </div>
                            )}

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full p-4 bg-white bg-opacity-20 rounded-xl border ${
                                        errors.email ? 'border-red-500' : 'border-white'
                                    } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white`}
                                    required
                                />
                                {errors.email && (
                                    <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full p-4 bg-white bg-opacity-20 rounded-xl border ${
                                        errors.password ? 'border-red-500' : 'border-white'
                                    } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white`}
                                    required
                                />
                                {errors.password && Array.isArray(errors.password) && (
                                    <div className="mt-1 text-red-400 text-sm">
                                        {errors.password.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white bg-opacity-20 rounded-xl border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="customer" className="text-black">Customer</option>
                                    <option value="renter" className="text-black">Renter</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-white text-black p-4 rounded-xl font-bold hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button
                                onClick={() => {
                                    setIsLogin(!isLogin);
                                    setErrors({});
                                }}
                                className="text-white hover:underline"
                            >
                                {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
