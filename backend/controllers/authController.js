const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User does not exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            user: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

// Get profile route
exports.getProfile = async (req, res) => {
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
};

// Update profile route
exports.updateProfile = async (req, res) => {
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
};

// Delete profile route
exports.deleteProfile = async (req, res) => {
    try {
        const userEmail = req.user.email; // Assuming req.user is populated by auth middleware
        const user = await User.findOneAndDelete({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};