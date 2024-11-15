// contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { register as registerService, login as loginService, logout as logoutService } from '../services/authService';


/**
 * Authentication context for managing user state and auth operations
 */

export const AuthContext = createContext();

/**
 * Authentication provider component
 * Manages user authentication state and provides auth methods
 */

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
// Check for existing auth token on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const [emailId] = atob(token).split(':');
            setUser({ emailId });
        }
    }, []);

/**
 * Register a new user
 * @param {Object} userData - User registration data
 */
    const register = async (userData) => {
        try {
            setError(null);
            const response = await registerService(userData);
            setUser({ emailId: userData.email }); // Update to use emailId
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    /**
 * Log in an existing user
 * @param {string} email - User's email
 * @param {string} password - User's password
 */
    const login = async (email, password) => {
        try {
            setError(null);
            const response = await loginService(email, password);
            setUser({ email });
            return response;
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await logoutService();
            setUser(null);
            setError(null);
        } catch (error) {
            setError(error.message);
            throw error;
        }
    };

    const value = {
        user,
        error,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
