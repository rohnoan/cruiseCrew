import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import bg from "../../public/bg/bgaccounts.jpg";

export default function Account() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        
        try {
            if (isLogin) {
                const response = await auth.login(formData.email, formData.password);
                localStorage.setItem('token', response.data.token);
                navigate(formData.role === 'seller' ? '/seller' : '/customer');
            } else {
                await auth.register(formData);
                setIsLogin(true);
                setError('Registration successful! Please login.');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center w-full font-syne py-12 px-4 sm:px-6 lg:px-8">
            <img className="absolute w-full h-full object-cover" src={bg} alt="Background" />
            
            <div className="relative w-full max-w-md">
                {/* Card Container */}
                <div className="bg-black bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden">
                    {/* Toggle Buttons */}
                    <div className="flex mb-0">
                        <button
                            className={`w-1/2 p-4 text-center ${isLogin ? 'bg-white text-black' : 'text-white'} transition-all duration-300`}
                            onClick={() => setIsLogin(true)}
                        >
                            Login
                        </button>
                        <button
                            className={`w-1/2 p-4 text-center ${!isLogin ? 'bg-white text-black' : 'text-white'} transition-all duration-300`}
                            onClick={() => setIsLogin(false)}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Form Container */}
                    <div className="p-8">
                        <h2 className="text-3xl font-bold text-white text-center mb-8">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h2>

                        {error && (
                            <div className={`p-3 rounded mb-4 text-center ${
                                error.includes('successful') ? 'bg-green-500' : 'bg-red-500'
                            } text-white`}>
                                {error}
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
                                        className="w-full p-4 bg-white bg-opacity-20 rounded-xl border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                                        required
                                    />
                                </div>
                            )}

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white bg-opacity-20 rounded-xl border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white bg-opacity-20 rounded-xl border border-white text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                />
                            </div>

                            <div>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full p-4 bg-white bg-opacity-20 rounded-xl border border-white text-white focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    <option value="customer" className="text-black">Customer</option>
                                    <option value="seller" className="text-black">Seller</option>
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
                                onClick={() => setIsLogin(!isLogin)}
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
