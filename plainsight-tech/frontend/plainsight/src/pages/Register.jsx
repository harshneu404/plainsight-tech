import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { commonStyles } from '../styles/globalStyles';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-gray-600">Start managing your tasks today</p>
        </div>

          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            {error && (
              <div className="text-red-500 text-center text-sm">{error}</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className={`${commonStyles.input} text-center`}
                  required
                />
              </div>
              <div className="text-center">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className={`${commonStyles.input} text-center`}
                  required
                />
              </div>
            </div>

            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-center">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`${commonStyles.input} text-center`}
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
                required
              />
            </div>

            <div className="text-center pt-2">
              <button
                type="submit"
                className={`${commonStyles.button.primary} w-full`}
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
  );
};

export default Register;
