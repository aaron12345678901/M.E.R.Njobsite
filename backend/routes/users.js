const express = require('express');
const User = require('../models/User');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // Corrected the import to use the correct middleware

// GET profile route - fetch the user's profile using their email
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const userEmail = req.user.email;
        const user = await User.findOne({ email: userEmail }).select('email');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ email: user.email });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// PUT profile route - update the user's profile (email)
router.put('/profile', authMiddleware, async (req, res) => {
    const { email } = req.body;
    try {
        const userEmail = req.user.email;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const user = await User.findOneAndUpdate({ email: userEmail }, { email }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Email updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;