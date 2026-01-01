import Task from '../models/taskModel.js';


// @desc    Retrieve all tasks for the current user
// @route   GET /api/tasks
// @access  Private (Requires login)
export const getTasks = async (req, res) => {
    const tasks = await Task.find({ user: req.user._id });

    res.status(200).json(tasks);
}

//@desc Create new task
//@route POST/api/tasks
//@access Private
export const createTask = async (req, res) => {
    if (!req.body.title) {
        res.status(400);
        throw new Error('Please add task title');
    }

    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
    });

    res. status(200).json(task);
}

