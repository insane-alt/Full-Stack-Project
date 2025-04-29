// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const User = require('../models/user');
const Admin = require('../models/admin');
const Student = require('../models/student');
const Mentor = require('../models/mentor');
const Collaborator = require('../models/collaborator');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

// Middleware to validate request body for registration
const validateRegistration = (req, res, next) => {
    const { username, email, password, userType } = req.body;

    if (!username || !email || !password || !userType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const validUserTypes = ['admin', 'student', 'mentor', 'collaborator'];
    if (!validUserTypes.includes(userType)) {
        return res.status(400).json({ message: 'Invalid user type' });
    }

    // Additional validation based on userType
    if (userType === 'student' && !req.body.rollNumber) {
        return res.status(400).json({ message: 'Roll number is required for students' });
    }

    if ((userType === 'mentor' || userType === 'admin') && !req.body.department) {
        return res.status(400).json({ message: 'Department is required' });
    }

    if (userType === 'collaborator' && !req.body.organization) {
        return res.status(400).json({ message: 'Organization is required' });
    }

    next();
};

// Register a new user with role-specific details
router.post('/register', validateRegistration, async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists with this username or email'
            });
        }

        // Create the base user
        const newUser = await User.create({
            username,
            email,
            password,  // Password will be hashed by the beforeCreate hook
            userType
        });

        // Handle role-specific creation based on userType
        let roleSpecificData;

        switch (userType) {
            case 'admin':
                roleSpecificData = await Admin.create({
                    userId: newUser.id,
                    department: req.body.department,
                    position: req.body.position || 'General Admin',
                    permissions: req.body.permissions || undefined
                });
                break;

            case 'student':
                roleSpecificData = await Student.create({
                    userId: newUser.id,
                    rollNumber: req.body.rollNumber,
                    department: req.body.department,
                    year: req.body.year,
                    semester: req.body.semester,
                    mentorId: req.body.mentorId || null
                });
                break;

            case 'mentor':
                roleSpecificData = await Mentor.create({
                    userId: newUser.id,
                    department: req.body.department,
                    designation: req.body.designation,
                    expertise: req.body.expertise || [],
                    maxStudents: req.body.maxStudents || 5
                });
                break;

            case 'collaborator':
                roleSpecificData = await Collaborator.create({
                    userId: newUser.id,
                    organization: req.body.organization,
                    role: req.body.role,
                    expertise: req.body.expertise || [],
                    projects: req.body.projects || []
                });
                break;
        }

        // Generate token for the new user (auto-login after registration)
        const token = jwt.sign(
            { id: newUser.id, userType: newUser.userType },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                userType: newUser.userType
            },
            token
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user with password (using scope)
        const user = await User.scope('withPassword').findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }

        // Validate password
        const isPasswordValid = await user.validPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Fetch role-specific data based on userType
        let roleData = null;

        switch (user.userType) {
            case 'admin':
                roleData = await Admin.findOne({ where: { userId: user.id } });
                break;
            case 'student':
                roleData = await Student.findOne({ where: { userId: user.id } });
                break;
            case 'mentor':
                roleData = await Mentor.findOne({ where: { userId: user.id } });
                break;
            case 'collaborator':
                roleData = await Collaborator.findOne({ where: { userId: user.id } });
                break;
        }

        // Generate token
        const token = jwt.sign(
            { id: user.id, userType: user.userType },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                userType: user.userType,
                roleData
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
});

// Get current user profile with role-specific data
router.get('/me', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user without password
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get role-specific data based on userType
        let roleData = null;

        switch (user.userType) {
            case 'admin':
                roleData = await Admin.findOne({ where: { userId } });
                break;
            case 'student':
                roleData = await Student.findOne({
                    where: { userId },
                    include: [{ model: Mentor, as: 'mentor' }]
                });
                break;
            case 'mentor':
                roleData = await Mentor.findOne({
                    where: { userId },
                    include: [{ model: Student, as: 'students' }]
                });
                break;
            case 'collaborator':
                roleData = await Collaborator.findOne({ where: { userId } });
                break;
        }

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                userType: user.userType,
                createdAt: user.createdAt,
                roleData
            }
        });

    } catch (error) {
        console.error('Profile fetch error:', error);
        res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
    }
});

// Update user password
router.put('/change-password', authenticateToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new passwords are required' });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({ message: 'New password must be at least 6 characters' });
        }

        // Get user with password
        const user = await User.scope('withPassword').findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate current password
        const isPasswordValid = await user.validPassword(currentPassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });

    } catch (error) {
        console.error('Password change error:', error);
        res.status(500).json({ message: 'Failed to change password', error: error.message });
    }
});

// Logout - client-side only (just for documentation completeness)
router.post('/logout', (req, res) => {
    // JWT tokens can't be invalidated server-side without additional storage
    // The client should remove the token from storage
    res.status(200).json({ message: 'Logged out successfully' });
});

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = user;
        next();
    });
}

// Role-based authentication middleware generator
function authorizeRole(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (!roles.includes(req.user.userType)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
}

module.exports = {
    router,
    authenticateToken,
    authorizeRole
};