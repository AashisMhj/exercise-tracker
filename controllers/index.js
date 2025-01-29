const Exercise = require('../models/Exercise');
const User = require('../models/User');

const addUser = async (req, res) => {
    try {
        const newUser = await User.create({ username: req.body.username });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const logExercise = async (req, res) => {
    try {
        const { description, duration, date } = req.body;
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const exercise = new Exercise({
            username: user.username,
            date,
            duration,
            description,
            date: date ? new Date(date) : new Date()
        });

        await exercise.save();

        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getUserLogs = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        let query = { username: user.username };
        if (req.query.from || req.query.to) {
            query.date = {};
            if (req.query.from) query.date.$gte = new Date(req.query.from);
            if (req.query.to) query.date.$lte = new Date(req.query.to);
        }

        let exercises = Exercise.find(query).select('description duration date -_id');

        if (req.query.limit) exercises = exercises.limit(parseInt(req.query.limit));

        exercises = await exercises.exec();

        res.json({
            _id: user._id,
            username: user.username,
            count: exercises.length,
            log: exercises.map((ex) => ({
                description: ex.description,
                duration: ex.duration,
                date: ex.date.toDateString()
            }))
        })
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

module.exports = {
    addUser,
    getUsers,
    getUserLogs,
    logExercise
}