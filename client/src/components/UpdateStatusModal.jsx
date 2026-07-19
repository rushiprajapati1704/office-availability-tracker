import { useState } from "react";
import {
    updateStatus,
    createSchedule,
} from "../services/api";
const statusOptions = [
    "Available",
    "Busy",
    "In Meeting",
    "Lunch",
    "Work From Home",
    "On Leave",
    "Out of Office",
];

const UpdateStatusModal = ({ isOpen,onClose,refresh }) => {
    const [formData, setFormData] = useState({
        status: "Available",
        message: "",
        expectedReturn: "",
        scheduleForLater: false,
        startTime: "",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (formData.scheduleForLater) {

                await createSchedule({
                    status: formData.status,
                    message: formData.message,
                    expectedReturn:
                        formData.expectedReturn,
                    startTime: formData.startTime,
                });

            } else {

                await updateStatus({
                    status: formData.status,
                    message: formData.message,
                    expectedReturn:
                        formData.expectedReturn,
                });

            }

            
            refresh();
            onClose();

        } catch (error) {

            console.log(error);

        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

            <div className="bg-white rounded-lg w-full max-w-lg p-6">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        Update Status
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-2xl"
                    >
                        ×
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                        >
                            {statusOptions.map((status) => (
                                <option key={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Message</label>

                        <textarea
                            name="message"
                            rows="3"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    <div>
                        <label>Expected Return</label>

                        <input
                            type="datetime-local"
                            name="expectedReturn"
                            value={formData.expectedReturn}
                            onChange={handleChange}
                            className="w-full border rounded p-2 mt-1"
                        />
                    </div>

                    <div className="flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="scheduleForLater"
                            checked={formData.scheduleForLater}
                            onChange={handleChange}
                        />

                        <label>
                            Schedule this status for later
                        </label>

                    </div>

                    {formData.scheduleForLater && (

                        <div>

                            <label>
                                Start Time
                            </label>

                            <input
                                type="datetime-local"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleChange}
                                className="w-full border rounded p-2 mt-1"
                            />

                        </div>

                    )}

                    <button
                        className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
                    >
                        Save
                    </button>

                </form>

            </div>

        </div>
    );
};

export default UpdateStatusModal;