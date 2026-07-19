import Status from "../models/Status.js";
import StatusHistory from "../models/StatusHistory.js";
import ScheduledStatus from "../models/ScheduledStatus.js";

export const getStatus = async (req, res) => {
    try {
        let status = await Status.findOne();

        if (!status) {
            status = await Status.create({
                status: "Available"
            });
        }

        res.status(200).json(status);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const updateStatus = async (req, res) => {

    try {

        const {
            status,
            message,
            expectedReturn
        } = req.body;

        let current = await Status.findOne();

        if (!current) {
            current = new Status();
        }

        current.status = status;
        current.message = message;
        current.expectedReturn = expectedReturn;
        current.updatedAt = new Date();

        await current.save();

        const io = req.app.get("io");

        io.emit("statusUpdated", current);

        await StatusHistory.create({
            status,
            message,
            expectedReturn
        });

        res.json({
            success: true,
            message: "Status Updated",
            data: current
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getHistory = async (req, res) => {

    try {

        const history = await StatusHistory
            .find()
            .sort({ changedAt: -1 })
            .limit(20);

        res.json(history);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const scheduleStatus = async (req, res) => {

    try {

        const schedule = await ScheduledStatus.create(req.body);

        res.status(201).json(schedule);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getSchedules = async (req, res) => {

    try {

        const schedules = await ScheduledStatus
            .find()
            .sort({ startTime: 1 });

        res.json(schedules);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const deleteSchedule = async (req, res) => {

    try {

        await ScheduledStatus.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Schedule Deleted"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};