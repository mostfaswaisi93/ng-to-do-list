const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Task', taskSchema);