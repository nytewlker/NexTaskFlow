const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const authController = {
    signup: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            const userExists = await User.findOne({ email });

            if (userExists) return res.status(400).json({ message: "User already exists" });

            const user = await User.create({ name, email, password, role });
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            
            res.status(201).json({ token, user: { id: user._id, name, email, role } });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
            res.json({ token, user: { id: user._id, name: user.name, email } });
        } catch (error) {
            res.status(500).json({ message: "Server error" });
        }
    },

    forgotPassword: async (req, res) => {
        const { email } = req.body;
        if (!email || !email.includes('@')) return res.status(400).json({ message: "Valid email is required" });

        try {
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: "User not found" });

            const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            user.verificationCode = verificationCode;
            await user.save();

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: "Password Reset Verification Code",
                text: `Your verification code is: ${verificationCode}`
            });

            res.json({ message: "Verification code sent to your email" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },

    verifyCode: async (req, res) => {
        const { email, code, newPassword } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user || user.verificationCode !== code) {
                return res.status(400).json({ message: "Invalid verification code" });
            }

            user.password = await bcrypt.hash(newPassword, 10);
            user.verificationCode = undefined;
            await user.save();

            res.json({ message: "Password has been reset successfully" });
        } catch (error) {
            res.status(500).json({ message: "Server error", error });
        }
    },
};

module.exports = authController;