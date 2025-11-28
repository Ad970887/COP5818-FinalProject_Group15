const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./models/user');

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Initialize demo user with balance
async function initializeDemoUser() {
  try {
    const demoEmail = 'demo@payvo.com';
    const existingUser = await User.findOne({ email: demoEmail });
    
    if (!existingUser) {
      const demoUser = new User({
        email: demoEmail,
        balance: 1000, // $1000 USD total balance
        stablecoins: {
          USDC: 500, // 500 USDC
          USDT: 300, // 300 USDT
          DAI: 200   // 200 DAI
        }
      });
      await demoUser.save();
      console.log(`✓ Demo user created: ${demoEmail}`);
      console.log(`  - USDC: 500`);
      console.log(`  - USDT: 300`);
      console.log(`  - DAI: 200`);
    } else {
      console.log(`✓ Demo user already exists: ${demoEmail}`);
    }
  } catch (err) {
    console.error('Error initializing demo user:', err.message);
  }
}

// Initialize demo user after DB connects
setTimeout(initializeDemoUser, 1000);

// Global error handler for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // In production, you might want to restart the process
  // For dev, just log and continue
});

app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/users', require('./routes/users'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
