// components/Task.jsx
import React, { useState } from 'react';
import { commonStyles } from '../styles/globalStyles';
/**
 * Task status options
 * @type {string[]}
 */
const TASK_STATUSES = ['pending', 'in-progress', 'completed'];

/**
 * Task component for displaying and editing individual tasks
 * @param {Object} props
 * @param {Object} props.task - Task object
 * @param {Function} props.onUpdate - Callback for updating task
 * @param {Function} props.onDelete - Callback for deleting task
 */
const Task = ({ task, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState({
        title: false,
        description: false
    });
    const [editedTask, setEditedTask] = useState(task);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async (field, value) => {
        if (value === task[field]) {
            setIsEditing(prev => ({ ...prev, [field]: false }));
            return;
        }
        
        setIsUpdating(true);
        try {
            await onUpdate(task.id, { [field]: value });
            setEditedTask(prev => ({ ...prev, [field]: value }));
        } catch (error) {
            setEditedTask(prev => ({ ...prev, [field]: task[field] }));
        } finally {
            setIsUpdating(false);
            setIsEditing(prev => ({ ...prev, [field]: false }));
        }
    };
 /**
     * Returns appropriate color classes based on task status
     * @param {string} status - Task status
     * @returns {string} Tailwind CSS classes
     */
    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'in-progress': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className={`${commonStyles.card} relative ${isUpdating ? 'opacity-70' : ''}`}>
            <div className="p-4 space-y-3">
                {isEditing.title ? (
                    <input
                        type="text"
                        value={editedTask.title}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, title: e.target.value }))}
                        onBlur={() => handleUpdate('title', editedTask.title)}
                        className="w-full text-lg font-medium px-2 py-1 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                        autoFocus
                    />
                ) : (
                    <h3 
                        className="text-lg font-medium text-gray-800 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                        onClick={() => setIsEditing(prev => ({ ...prev, title: true }))}
                    >
                        {editedTask.title}
                    </h3>
                )}

                {isEditing.description ? (
                    <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask(prev => ({ ...prev, description: e.target.value }))}
                        onBlur={() => handleUpdate('description', editedTask.description)}
                        className="w-full px-2 py-1 bg-white border border-gray-200 rounded focus:outline-none focus:border-blue-500 min-h-[100px] resize-none"
                        autoFocus
                    />
                ) : (
                    <p 
                        className="text-gray-600 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded"
                        onClick={() => setIsEditing(prev => ({ ...prev, description: true }))}
                    >
                        {editedTask.description}
                    </p>
                )}

                <div className="flex justify-between items-center pt-2">
                    <select
                        value={editedTask.status}
                        onChange={(e) => handleUpdate('status', e.target.value)}
                        className={`${getStatusColor(editedTask.status)} px-3 py-1 rounded-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {TASK_STATUSES.map(status => (
                            <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                        ))}
                    </select>

                    <button
                        onClick={() => onDelete(task.id)}
                        className="text-red-500 hover:text-red-700 text-sm focus:outline-none"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {isUpdating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 rounded-lg">
                    <span className="text-sm text-gray-500">Updating...</span>
                </div>
            )}
        </div>
    );
};

export default Task;
