import express from "express";

import {
    getStatus,
    updateStatus,
    getHistory,
    scheduleStatus,
    getSchedules,
    deleteSchedule
} from "../controllers/statusController.js";

const router = express.Router();

router.get("/status", getStatus);

router.put("/status", updateStatus);

router.get("/history", getHistory);

router.post("/schedule", scheduleStatus);

router.get("/schedule", getSchedules);

router.delete("/schedule/:id", deleteSchedule);

export default router;