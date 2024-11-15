// controllers/taskController.js
const { db } = require('../model');
const Task = db.Task;

const taskController = {
    /**
     * Create a new task
     */
    createTask: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 0) {
                return res.status(400).json({
                    error: 'Invalid Query',
                    message: "The Query is Invalid"
                });
            }

            // Validate required fields
            const { title, description, status } = req.body;
            if (!title || !description) {
                return res.status(400).json({
                    error: 'Missing Required Fields',
                    message: "Title and description are required"
                });
            }

            // Validate status if provided
            if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
                return res.status(400).json({
                    error: 'Invalid Status',
                    message: "Status must be one of: pending, in-progress, completed"
                });
            }

            const task = await Task.create({
                title,
                description,
                status: status || 'pending',
                userId: req.user.id
            });

            res.status(201).json(task);
        } catch (err) {
            console.error('Error creating task:', err);
            res.status(500).json({
                error: 'Task Creation Failed',
                message: err.message
            });
        }
    },

    /**
     * Update an existing task
     */
    updateTask: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 0) {
                return res.status(400).json({
                    error: 'Invalid Query',
                    message: "The Query is Invalid"
                });
            }

            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    userId: req.user.id
                }
            });

            if (!task) {
                return res.status(404).json({
                    error: 'Task Not Found',
                    message: "Task not found or unauthorized"
                });
            }

            // Validate status if being updated
            if (req.body.status && !['pending', 'in-progress', 'completed'].includes(req.body.status)) {
                return res.status(400).json({
                    error: 'Invalid Status',
                    message: "Status must be one of: pending, in-progress, completed"
                });
            }

            await task.update(req.body);
            
            const updatedTask = await Task.findByPk(req.params.id);
            res.json(updatedTask);
        } catch (err) {
            console.error('Error updating task:', err);
            res.status(500).json({
                error: 'Update Failed',
                message: err.message
            });
        }
    },

    /**
     * Get all tasks for the authenticated user
     */
    getTasks: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 0) {
                return res.status(400).json({
                    error: 'Invalid Query',
                    message: "The Query is Invalid"
                });
            }

            const tasks = await Task.findAll({
                where: { userId: req.user.id },
                order: [['createdAt', 'DESC']]
            });

            res.json(tasks);
        } catch (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({
                error: 'Fetch Failed',
                message: err.message
            });
        }
    },

    /**
     * Delete a task
     */
    deleteTask: async (req, res) => {
        try {
            if (Object.keys(req.query).length > 0) {
                return res.status(400).json({
                    error: 'Invalid Query',
                    message: "The Query is Invalid"
                });
            }

            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    userId: req.user.id
                }
            });

            if (!task) {
                return res.status(404).json({
                    error: 'Task Not Found',
                    message: "Task not found or unauthorized"
                });
            }

            await task.destroy();
            res.status(204).send();
        } catch (err) {
            console.error('Error deleting task:', err);
            res.status(500).json({
                error: 'Delete Failed',
                message: err.message
            });
        }
    }
};

module.exports = taskController;
