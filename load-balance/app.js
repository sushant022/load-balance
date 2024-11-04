require('dotenv').config();
const express = require('express');
const sequelize = require('./db');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const SemesterRouter = require('./controllers/semester');
const app = express();
const PORT = process.env.PORT || 3000;
const Semester = require('./models/semester');
const Subject = require('./models/subject');
const User = require('./models/user');

// sequelize.sync().then(() => {
//     console.log('Database & tables created!');
//     return Promise.all([Semester.sync(), Subject.sync(), User.sync()]);
// }).then(() => {
//     console.log('Semesters and Subjects tables synced!');
// }).catch(error => {
//     console.error('Error syncing tables:', error);
 
// Middleware to parse JSON
app.use(express.json());
app.use(cors());
app.use('/semesters', SemesterRouter);

// Signup route
app.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // Generate a token (optional)
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});