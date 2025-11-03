require("dotenv").config();
const app = require("./src/app");
const connectdb = require("./src/db/db")
const logger = require("./src/config/logger");
const http = require("http")
const { initSocket } = require('./src/socket/socket'); // 👈 Import socket setup


const server = http.createServer(app);


const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

connectdb()


initSocket(server, CLIENT_URL, JWT_SECRET);


server.listen(PORT, ()=>{
    logger.info(`✅ Listening to Server on the Port ${PORT}`);
})