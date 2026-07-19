import axios from "axios";

const api = axios.create({
    baseURL: "https://office-availability-tracker.onrender.com/api",
});

export const getStatus = () => api.get("/status");

export const updateStatus = (data) =>
    api.put("/status", data);

export const getHistory = () =>
    api.get("/history");

export const getSchedules = () =>
    api.get("/schedule");

export const createSchedule = (data) =>
    api.post("/schedule", data);

export default api;