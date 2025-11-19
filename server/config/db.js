// MongoDB connection
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || "mongodb+srv://ad970887_db_user:rNLqrkU2pJwLIXTm@finalproject-group15.8wmm7qy.mongodb.net/?appName=FinalProject-Group15";
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB connected successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;