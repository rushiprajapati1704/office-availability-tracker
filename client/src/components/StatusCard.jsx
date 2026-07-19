import UpdateStatusModal from "./UpdateStatusModal";
import { useState } from "react";

const StatusCard = ({ status, refresh }) => {
    const [isOpen, setIsOpen] = useState(false);

    const getStatusColor = (status) => {
        switch (status) {
            case "Available":
                return "text-green-600 bg-green-100";

            case "Busy":
                return "text-yellow-700 bg-yellow-100";

            case "In Meeting":
                return "text-red-600 bg-red-100";

            case "Lunch":
                return "text-orange-600 bg-orange-100";

            case "Work From Home":
                return "text-blue-600 bg-blue-100";

            case "On Leave":
                return "text-purple-600 bg-purple-100";

            default:
                return "text-gray-700 bg-gray-100";
        }
    };

    if (!status) {
        return (
            <div className="bg-white rounded-xl shadow p-6">
                Loading...
            </div>
        );
    }

    return (
        <>
            <div className="bg-white rounded-2xl shadow-xl p-8">

                <h2 className="text-xl font-bold mb-6">
                    Current Status
                </h2>

                <div className="space-y-4">

                    <p className={`inline-block px-6 py-3 rounded-full text-2xl font-bold ${getStatusColor(
                        status.status
                    )}`}>
                        {status.status}
                    </p>

                    <p className="text-lg text-gray-700 mt-5">
                        {status.message || "No message"}
                    </p>

                    <div className="mt-6 grid md:grid-cols-2 gap-4">

                        <div className="bg-gray-100 rounded-lg p-4">

                            <h3 className="font-semibold text-gray-600">
                                Expected Return
                            </h3>

                            <p className="text-lg">

                                {status.expectedReturn
                                    ? new Date(status.expectedReturn).toLocaleString()
                                    : "--"}

                            </p>

                        </div>

                        <div className="bg-gray-100 rounded-lg p-4">

                            <h3 className="font-semibold text-gray-600">
                                Last Updated
                            </h3>

                            <p className="text-lg">
                                {new Date(status.updatedAt).toLocaleString()}
                            </p>

                        </div>

                    </div>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="mt-8 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-lg font-semibold"
                    >
                        Update Status
                    </button>

                </div>

            </div>

            <UpdateStatusModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                refresh={refresh}
            />
        </>
    );
};

export default StatusCard;