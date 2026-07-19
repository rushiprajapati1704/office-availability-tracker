import mongoose from "mongoose";

const statusSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            enum: [
                "Available",
                "Busy",
                "In Meeting",
                "Lunch",
                "Work From Home",
                "On Leave",
                "Out of Office",
            ],
            required: true,
            default: "Available",
        },

        message: {
            type: String,
            default: "",
            trim: true,
        },

        expectedReturn: {
            type: Date,
            default: null,
        },

        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        versionKey: false,
    }
);

export default mongoose.model("Status", statusSchema);