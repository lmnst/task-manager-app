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
        priority: req.body.priority || 'Low',
    });

    res. status(200).json(task);
}

// @desc    update task
// @route   PUT /api/tasks/:id
// @access  Private

export const updateTask = async (req,res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(404);
        throw new Error('The task was not found.')
    }

    if(task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You do not have permission to modify this task!');
    }

    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedTask);
};

// @desc    delete Task
// @route   DELETE /api/tasks/:id
// @access  Private

export const deleteTask = async (req, res) => {
    const task = await Task.findById(req.params.id);

    if(!task) {
        res.status(404);
        throw new Error('The task was not found.');
    }

    if(task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You do not have permission to modify this task!');
    }

    await task.deleteOne();

    res.status(200).json({ id: req.params.id});
};