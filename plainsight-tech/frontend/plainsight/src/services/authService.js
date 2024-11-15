import api from './api';

/* Log in an existing user
     * @param {string} email - User's email
     * @param {string} password - User's password
     * @returns {Promise<Object>} User data
     */

export const login = async (email, password) => {
    const token = btoa(`${email}:${password}`);
    try {
      
      const response = await api.get('/users', {
        headers: { Authorization: `Basic ${token}` }
      });
      
      localStorage.setItem('token', token);
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

   /**
     * Register a new user
     * @param {Object} userData - User registration data
     * @param {string} userData.emailId - User's email
     * @param {string} userData.password - User's password
     * @param {string} userData.firstName - User's first name
     * @param {string} userData.lastName - User's last name
     * @returns {Promise<Object>} Registered user data
     */
  export const register = async({ firstName, lastName, email, password }) =>{
    try{
      const response = await api.post('/users',{
        emailId:email,
        password,
        firstName,
        lastName
      });
      return response.data;
    }catch(error){
      console.error('Register failed:', error);
      throw error;
    }
  }
  
  /**
     * Log out the current user
     * Removes authentication token from storage
     */
  export const logout = async () => {
    localStorage.removeItem('token');
  };
