# Task Management Application

A modern task management application built with React.js and Node.js, featuring real-time updates, user authentication, and a clean, intuitive interface inspired by Google Keep.

## Features

- **User Authentication**: Secure login and registration system
- **Real-time Task Management**: Create, read, update, and delete tasks
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Status Tracking**: Track task status (pending, in-progress, completed)
- **Inline Editing**: Edit tasks directly without modal dialogs
- **Grid Layout**: Organized task display with a responsive grid system

## Technology Stack

### Frontend
- React.js
- Tailwind CSS
- Axios for API calls
- React Router for navigation
- Context API for state management

### Backend
- Node.js
- Express.js
- MySQL with Sequelize ORM
- Basic Authentication
- CORS enabled

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/harshneu404/plainsight-tech.git
   cd plainsight-tech

2. **BackEnd Setup**
    cd backend

    # Create .env file with the following variables:
    DB_HOST=localhost
    DB_USER=your_mysql_username
    DB_PASSWORD=your_mysql_password
    DB_NAME=your_database_name
    PORT=3000

    # Install dependencies
    npm install


    # Start the server
    npm run dev
3. **FrontEnd Set up**
    cd frontend

    # Create .env file with:
    VITE_BASE_URL=http://localhost:5173

    # Install dependencies
    npm install

    # Start the development server
    npm run dev

**FrontEnd Architecture**
Used React Context for state management instead of Redux

Trade-off: Simpler setup but might not scale as well for larger applications


Implemented inline editing for better user experience

Trade-off: More complex component logic but better usability

**Backend Architecture**

Used Sequelize ORM for database operations

Pros: Type safety, easy migrations, query building
Trade-off: Additional abstraction layer, potential performance overhead

**Database Design**
-- Users Table
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    emailId VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    createdAt DATETIME,
    updatedAt DATETIME
);

-- Tasks Table
CREATE TABLE tasks (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
    userId INT,
    createdAt DATETIME,
    updatedAt DATETIME,
    FOREIGN KEY (userId) REFERENCES users(id)
);
**APIs**
POST /users/create - Register new user
GET /users/get - User login

GET /tasks/get - Get all tasks for user
POST /tasks/create - Create new task
PUT /tasks/:id - Update task status
DELETE /tasks/:id - Delete task

**Future Improvements**

Feature Additions:
    Task categories/labels
    Task due dates
    Task sharing between users
    Task search and filtering


Technical Improvements

    Add unit tests
    Implement WebSocket for real-time updates
    Add pagination for tasks
    Implement proper error handling
    Add input validation
    Add proper logging
