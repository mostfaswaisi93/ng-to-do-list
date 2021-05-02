const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    taskName: {
        type: String,
        required: 'This Filed is required'
    },
    date: {
        type: Date,
        required: 'This Filed is required'
    },
    status: {
        type: String,
        required: 'This Filed is required'
    },
    description: {
        type: String,
        required: 'This Filed is required'
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task }