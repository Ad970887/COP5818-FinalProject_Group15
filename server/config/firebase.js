// Firebase setup
const admin = require('firebase-admin');
const serviceAccount = require('../firebase-service.json');

try {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error.message);
}

module.exports = admin;