const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db')
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const cors = require('cors')

//loading eenvironment variables
dotenv.config();

//Before starting the server, call the function to connect to the database
connectDB();

const app = express();

app.use(cors());
app.use(express.json())

//reading port number from .env, if not found, use the default port number
const PORT = process.env.PORT||5000;

//create routes
//request, response
app.get('/', (req, res) => {
    res.send('API is working');
});

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

//strat the server, listen port
app. listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});