import mongoose from "mongoose";

const scheduledStatusSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            required: true,
        },

        message: {
            type: String,
            default: "",
        },

        expectedReturn: {
            type: Date,
            default: null,
        },

        startTime: {
            type: Date,
            required: true,
        },

        executed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model(
    "ScheduledStatus",
    scheduledStatusSchema
);