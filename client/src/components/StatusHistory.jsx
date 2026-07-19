const history = [
    {
        status: "Available",
        time: "2:15 PM",
    },
    {
        status: "Lunch",
        time: "1:00 PM",
    },
    {
        status: "In Meeting",
        time: "11:30 AM",
    },
];

const StatusHistory = ({history}) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-5">
        📜 Status History
    </h2>

    <div className="space-y-4">

        {history.map((item) => (

            <div
                key={item._id}
                className="border-l-4 border-blue-600 pl-4"
            >

                <p className="font-semibold">
                    {item.status}
                </p>

                <p className="text-gray-500 text-sm">
                    {new Date(item.changedAt).toLocaleString()}
                </p>

            </div>

        ))}

    </div>

</div>
    );
};

export default StatusHistory;