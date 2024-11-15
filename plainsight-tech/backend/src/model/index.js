// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config');

async function initializeDatabase() {
    let connection;
    try {
        connection = await mysql.createConnection({
            user: dbConfig.USER,
            password: dbConfig.DB_PASSWORD,
            host: dbConfig.HOST,
            port: '3306',
        });

        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.DB}\`;`);
        console.log('Database created or already exists.');
    } catch (err) {
        console.error('Error creating database:', err);
        throw err;
    } finally {
        if (connection) await connection.end();
    }
}

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.DB_PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        logging: false
    }
);

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection established successfully");
        return "connected";
    } catch (err) {
        console.log("Error in connection", err);
        return "error";
    }
};

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user.model')(sequelize, DataTypes);
db.Task = require('./task.model')(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Task, { 
    foreignKey: 'userId',
    as: 'tasks'
});

db.Task.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user'
});

// Initialize database
(async () => {
    try {
        await initializeDatabase();
        await connectDb();
        await db.sequelize.sync({ force: false });
        console.log("Database Synced");
    } catch (err) {
        console.error('Database initialization failed:', err);
    }
})();

module.exports = { db, connectDb };
