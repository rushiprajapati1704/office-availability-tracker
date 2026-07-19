import mongoose from "mongoose";

const statusHistorySchema = new mongoose.Schema(
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

        changedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("StatusHistory", statusHistorySchema);