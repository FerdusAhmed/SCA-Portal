const admin = require('firebase-admin');
const { getDB } = require('../config/db');
const path = require('path');
const fs = require('fs');

// Check if Firebase service account file exists
const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

if (!fs.existsSync(serviceAccountPath)) {
    console.error("❌ ERROR: firebase-service-account.json is missing");
} else {
    try {
        const serviceAccount = require(serviceAccountPath);

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("✅ Firebase Admin Initialized");
    } catch (err) {
        console.error("❌ ERROR: Failed to initialize Firebase Admin. Details:", err.message);
    }
}

// Middleware: Verify Login Token
const getTokenAuth = async (req, res, next) => {
    try {
        const tokenHeader = req.headers.authorization;
        if (!tokenHeader || !tokenHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'No token provided or invalid format' });
        }

        const authToken = tokenHeader.split(' ')[1];
        const decoded = await admin.auth().verifyIdToken(authToken);
        
        req.token_email = decoded.email;
        next();
    } catch (error) {
        console.error('Auth Error:', error.message);
        return res.status(403).json({ message: 'Token is not valid' });
    }
};

// Middleware: Admin Secure
const getAdminSecure = async (req, res, next) => {
    try {
        const db = getDB();
        const email = req.token_email;
        const user = await db.collection('users').findOne({ email });

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Middleware: Teacher Secure
const getTeacherSecure = async (req, res, next) => {
    try {
        const db = getDB();
        const email = req.token_email;
        const user = await db.collection('users').findOne({ email });

        if (!user || user.role !== 'teacher') {
            return res.status(403).json({ message: 'Access denied. Teacher only.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Middleware: Student Secure
const getStudentSecure = async (req, res, next) => {
    try {
        const db = getDB();
        const email = req.token_email;
        const user = await db.collection('users').findOne({ email });

        if (!user || user.role !== 'student') {
            return res.status(403).json({ message: 'Access denied. Student only.' });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getTokenAuth, getAdminSecure, getStudentSecure, getTeacherSecure };