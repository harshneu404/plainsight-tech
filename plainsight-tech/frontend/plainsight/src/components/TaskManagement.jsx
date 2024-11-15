// src/components/TaskManagement.jsx
import React, { useState, useEffect } from 'react';
import Task from './Task';
import { taskService } from '../services/taskService';
import { commonStyles } from '../styles/globalStyles';


/**
 * Component for creating new tasks
 * @param {Object} props
 * @param {Function} props.onTaskCreate - Callback function for task creation
 */
const CreateTaskInput = ({ onTaskCreate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        status: 'pending'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTask.title.trim() || !newTask.description.trim()) return;
        
        onTaskCreate(newTask);
        setNewTask({ title: '', description: '', status: 'pending' });
        setIsExpanded(false);
    };

    return (
        <div className="max-w-2xl mx-auto mb-8">
            <div className={commonStyles.card + ' overflow-hidden'}>
                <form onSubmit={handleSubmit}>
                    {isExpanded ? (
                        <div className="p-4">
                            <input
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                placeholder="Title"
                                className="w-full text-lg font-medium mb-2 px-2 py-1 bg-white focus:outline-none border-b border-transparent focus:border-blue-500"
                            />
                            <textarea
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                placeholder="Create Task"
                                className="w-full min-h-[80px] px-2 py-1 bg-white focus:outline-none resize-none"
                            />
                            <div className="flex justify-end items-center mt-4 space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsExpanded(false)}
                                    className={commonStyles.button.secondary}
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className={commonStyles.button.primary}
                                >
                                    Add Task
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="p-4 cursor-text"
                            onClick={() => setIsExpanded(true)}
                        >
                            <p className="text-gray-600">Create a new Task...</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};


/**
 * Main TaskManagement component that handles the task list and operations
 * Manages tasks state and provides functionality for CRUD operations
 */
export default function TaskManagement() {
    const [tasks, setTasks] = useState([]);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [error, setError] = useState(null);
// Fetch tasks on component mount
    useEffect(() => {
        fetchTasks();
    }, []);

/**
 * Fetches all tasks from the API
 * Updates the tasks state and handles loading/error states
 */
    const fetchTasks = async () => {
        try {
            const data = await taskService.fetchTasks();
            setTasks(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsInitialLoading(false);
        }
    };
/**
* Creates a new task
* @param {Object} newTask - The task object to be created
* @param {string} newTask.title - Task title
* @param {string} newTask.description - Task description
* @param {string} newTask.status - Task status
*/
    const handleCreateTask = async (newTask) => {
        try {
            const createdTask = await taskService.createTask(newTask);
            setTasks(prevTasks => [createdTask, ...prevTasks]);
        } catch (error) {
            setError(error.message);
        }
    };
/**
     * Updates an existing task
     * @param {string} id - Task ID
     * @param {Object} updates - Object containing the fields to update
*/
    const handleUpdateTask = async (id, updates) => {
        try {
            await taskService.updateTask(id, updates);
            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task.id === id ? { ...task, ...updates } : task
                )
            );
        } catch (error) {
            throw error;
        }
    };
/**
     * Deletes a task
     * @param {string} id - Task ID
*/
    const handleDeleteTask = async (id) => {
        try {
            await taskService.deleteTask(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            setError(error.message);
        }
    };

    if (isInitialLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading tasks...</div>
            </div>
        );
    }

    return (
        <div className={commonStyles.container}>
             {/* Task creation input */}
            <CreateTaskInput onTaskCreate={handleCreateTask} />
            
            {error && (
                <div className="text-red-500 text-center mb-4">
                    {error}
                </div>
            )}
        {/* Task grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onUpdate={handleUpdateTask}
                        onDelete={handleDeleteTask}
                    />
                ))}
            </div>

            {tasks.length === 0 && !error && (
                <div className="text-center text-gray-500 py-8">
                    No tasks available. Create a new task to get started!
                </div>
            )}
        </div>
    );
}
