// src/services/taskService.js
import api from './api';
import { API_CONFIG } from '../config/api';

export const taskService = {

/**
     * Fetch all tasks for the authenticated user
     * @returns {Promise<Array>} List of tasks
    */
  fetchTasks: async () => {
    const response = await api.get(API_CONFIG.endpoints.tasks);
    return response.data;
  },

/**
     * Create a new task
     * @param {Object} task - Task data
     * @param {string} task.title - Task title
     * @param {string} task.description - Task description
     * @param {string} task.status - Task status
     * @returns {Promise<Object>} Created task
*/
  createTask: async (task) => {
    const response = await api.post(API_CONFIG.endpoints.tasks, task);
    return response.data;
  },

/**
     * Update an existing task
     * @param {string} id - Task ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated task
*/

  updateTask: async (id, updates) => {
    const response = await api.put(`${API_CONFIG.endpoints.tasks}/${id}`, updates);

    // Return updated task data
    return response.data;
  },
/**
     * Delete a task
     * @param {string} id - Task ID
     * @returns {Promise<void>}
*/

  deleteTask: async (id) => {
    await api.delete(`${API_CONFIG.endpoints.tasks}/${id}`);
  },
};
