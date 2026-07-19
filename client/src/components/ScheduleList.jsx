const schedules = [
    {
        status: "Meeting",
        time: "3:00 PM",
    },
    {
        status: "Available",
        time: "5:00 PM",
    },
];

const ScheduleList = () => {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6">

    <h2 className="text-2xl font-bold mb-5">
        📅 Upcoming Schedule
    </h2>

    <div className="space-y-4">

        {schedules.length === 0 ? (

            <p className="text-gray-500">
                No upcoming schedules
            </p>

        ) : (

            schedules.map((item) => (

                <div
                    key={item._id}
                    className="bg-blue-50 rounded-lg p-4 flex justify-between"
                >

                    <div>

                        <p className="font-semibold">
                            {item.status}
                        </p>

                        <p className="text-sm text-gray-500">
                            {item.message}
                        </p>

                    </div>

                    <div className="text-right">

                        <p className="font-medium">
                            {new Date(item.startTime).toLocaleString()}
                        </p>

                    </div>

                </div>

            ))

        )}

    </div>

</div>
    );
};

export default ScheduleList;