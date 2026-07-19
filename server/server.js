import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import statusRoutes from "./routes/statusRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use("/api", statusRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Office Availability Tracker API Running 🚀",
    });
});

const PORT = process.env.PORT || 5000;

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Client Connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("Client Disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});