const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, async (req, res) => {
    const tasks = [
        { id: 1, title:"Study JWT", isCompleted: true },
        { id:2, title: "finish TaskPage development", isCompleted: false }
    ];
    res.json(tasks);
});
module.exports = router;

//backend\routes\taskRoutes.js