const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password, role} = req.body;
            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = await User.create({ name, email, password });
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

            res.status(201).json({ token, user: { id: user._id, name, email, role } });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid credentials' });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.json({ token, user: { id: user._id, name: user.name, email } });
        } catch (error) {
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = authController;
