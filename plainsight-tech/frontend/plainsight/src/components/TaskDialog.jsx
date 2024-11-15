import React, { useState, useEffect } from 'react';
import { dialogStyles } from '../styles/dialogStyles';

const TASK_STATUSES = ['pending', 'in-progress', 'completed'];

const TaskDialog = ({ isOpen, onClose, onSubmit }) => {
   const [formData, setFormData] = useState({
       title: '',
       description: '',
       status: 'pending'
   });

   useEffect(() => {
       if (!isOpen) {
           setFormData({
               title: '',
               description: '',
               status: 'pending'
           });
       }
   }, [isOpen]);

   const handleSubmit = (e) => {
       e.preventDefault();
       onSubmit(formData);
   };

   if (!isOpen) return null;

   return (
       <div 
           className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
           onClick={(e) => {
               if (e.target === e.currentTarget) onClose();
           }}
       >
           <div 
               className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mx-4"
               onClick={e => e.stopPropagation()}
           >
               <h2 className="text-xl font-semibold text-gray-800 mb-4">
                   Create New Task
               </h2>

               <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                           Title
                       </label>
                       <input
                           type="text"
                           value={formData.title}
                           onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           required
                       />
                   </div>

                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                           Description
                       </label>
                       <textarea
                           value={formData.description}
                           onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                           rows={4}
                           required
                       />
                   </div>

                   <div>
                       <label className="block text-sm font-medium text-gray-700 mb-1">
                           Status
                       </label>
                       <select
                           value={formData.status}
                           onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
                           className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                       >
                           {TASK_STATUSES.map(status => (
                               <option key={status} value={status}>
                                   {status.charAt(0).toUpperCase() + status.slice(1)}
                               </option>
                           ))}
                       </select>
                   </div>

                   <div className="flex justify-end space-x-3 pt-4">
                       <button
                           type="button"
                           onClick={onClose}
                           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white 
                                    border border-gray-300 rounded-lg hover:bg-gray-50 
                                    transition-colors"
                       >
                           Cancel
                       </button>
                       <button
                           type="submit"
                           className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
                                    rounded-lg hover:bg-blue-600 transition-colors"
                       >
                           Create Task
                       </button>
                   </div>
               </form>
           </div>
       </div>
   );
};

export default TaskDialog;
