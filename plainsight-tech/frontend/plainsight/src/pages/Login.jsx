import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { commonStyles } from '../styles/globalStyles';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <div className="text-center">  
              <label className="block text-sm font-medium text-gray-700 mb-1 text-center">  
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${commonStyles.input} text-center`}  
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="text-center">  
              <label className="block text-sm font-medium text-gray-700 mb-1 text-center">  
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`${commonStyles.input} text-center`} 
                placeholder="••••••••"
                required
              />
            </div>

            <div className="text-center pt-2">  {/* Added text-center */}
              <button
                type="submit"
                className={`${commonStyles.button.primary} w-full`}
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Register
              </Link>
            </p>
          </div>
        </div>
    </div>
  );

};

export default Login;

