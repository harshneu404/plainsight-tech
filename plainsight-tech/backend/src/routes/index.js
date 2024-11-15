const express = require('express');
const router = express.Router();
const userRouter = require("./user.routes");
const taskRouter = require("./task.routes");

module.exports = function(app){
    app.use("/api/users", userRouter);
    app.use("/api/tasks", taskRouter);
}

