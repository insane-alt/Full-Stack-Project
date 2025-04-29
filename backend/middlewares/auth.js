// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Admin = require('../models/admin');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Authenticate user from token
const authenticateUser = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // Get user without password
        const user = await User.findByPk(decoded.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.isActive) {
            return res.status(403).json({ message: 'Account is deactivated' });
        }

        req.user = {
            id: user.id,
            username: user.username,
            email: user.email,
            userType: user.userType
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid token' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Token expired' });
        }

        console.error('Authentication error:', error);
        res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
};

// Check if user has specific role
const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const userRole = req.user.userType;

        if (Array.isArray(roles)) {
            if (!roles.includes(userRole)) {
                return res.status(403).json({ message: 'Access denied' });
            }
        } else if (roles !== userRole) {
            return res.status(403).json({ message: 'Access denied' });
        }

        next();
    };
};

// Admin permission check middleware
const checkAdminPermission = (permission) => {
    return async (req, res, next) => {
        if (!req.user || req.user.userType !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        try {
            const admin = await Admin.findOne({ where: { userId: req.user.id } });

            if (!admin) {
                return res.status(403).json({ message: 'Admin profile not found' });
            }

            if (!admin.permissions || !admin.permissions[permission]) {
                return res.status(403).json({
                    message: `You don't have permission to ${permission.replace('can', '').toLowerCase()}`
                });
            }

            next();
        } catch (error) {
            console.error('Permission check error:', error);
            res.status(500).json({ message: 'Permission check failed', error: error.message });
        }
    };
};

// Check if mentor is assigned to student
const isMentorOfStudent = async (req, res, next) => {
    if (!req.user || req.user.userType !== 'mentor') {
        return res.status(403).json({ message: 'Mentor access required' });
    }

    try {
        const studentId = req.params.studentId || req.body.studentId;

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        }

        const mentor = await Mentor.findOne({ where: { userId: req.user.id } });

        if (!mentor) {
            return res.status(403).json({ message: 'Mentor profile not found' });
        }

        const student = await Student.findOne({
            where: {
                id: studentId,
                mentorId: mentor.id
            }
        });

        if (!student) {
            return res.status(403).json({ message: 'You are not assigned as a mentor to this student' });
        }

        next();
    } catch (error) {
        console.error('Mentor check error:', error);
        res.status(500).json({ message: 'Mentor check failed', error: error.message });
    }
};

module.exports = {
    authenticateUser,
    requireRole,
    checkAdminPermission,
    isMentorOfStudent
};