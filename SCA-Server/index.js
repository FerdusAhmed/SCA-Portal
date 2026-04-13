require("dotenv").config(); // MUST BE LINE 1
const app = require('./src/app');
const { connectDB } = require("./src/config/db");

const port = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB(); 
        app.listen(port, () => {
          console.log('✅ Server is running on port:', port);
        });
    } catch (error) {
        console.error('❌ Database connection failed:', error);
    }
}

startServer();