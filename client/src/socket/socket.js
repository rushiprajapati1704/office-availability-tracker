import { io } from "socket.io-client";

const socket = io("https://office-availability-tracker.onrender.com");

export default socket;