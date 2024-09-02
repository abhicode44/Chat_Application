const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute');
const messageRoutes = require("./routes/messageRoute");
const socket = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

// Routes for register and login
app.use('/api/auth', userRoute);

// Routes for message 
app.use('/api/messages', messageRoutes);

require("dotenv").config();
const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

const server = app.listen(PORT, () => {
    console.log(`Server started successfully at ${PORT}`);
});

// Setup socket.io with CORS configuration
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    console.log("New client connected with socket ID:", socket.id);

    // Store the user ID and socket ID mapping
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} added to online users with socket ID: ${socket.id}`);
    });

    // Handle sending messages
    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
            console.log(`Message sent from user ${data.from} to user ${data.to}`);
        }
    });

    // Handle client disconnection
    socket.on("disconnect", () => {
        onlineUsers.forEach((value, key) => {
            if (value === socket.id) {
                onlineUsers.delete(key);
                console.log(`User ${key} with socket ID ${socket.id} disconnected`);
            }
        });
    });
});
