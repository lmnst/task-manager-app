const mongoose = require('mongoose');
const { type } = require('os');

const taskSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String },
    isCompleted: { type: Boolean, default: false },
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    }
}, { timestampes: true});

module.exports = mongoose.model('Task', taskSchema);
