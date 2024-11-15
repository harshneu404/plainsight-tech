// pages/Dashboard.jsx
import React from 'react';
import { useAuth } from '../hooks/useAuth';
import TaskManagement from '../components/TaskManagement';
import { commonStyles } from '../styles/globalStyles';

export default function Dashboard() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className={`${commonStyles.container} py-4`}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">Task Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-600">{user?.email}</span>
                            <button
                                onClick={logout}
                                className={commonStyles.button.secondary}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="py-6">
                <TaskManagement />
            </main>
        </div>
    );
}
