import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import StatusCard from "../components/StatusCard";
import StatusHistory from "../components/StatusHistory";
import ScheduleList from "../components/ScheduleList";
import socket from "../socket/socket";

import {
    getStatus,
    getHistory,
    getSchedules,
} from "../services/api";

const Home = () => {

    const [status, setStatus] = useState(null);
    const [history, setHistory] = useState([]);
    const [schedules, setSchedules] = useState([]);

    const loadData = async () => {
        try {

            const [statusRes, historyRes, scheduleRes] =
                await Promise.all([
                    getStatus(),
                    getHistory(),
                    getSchedules(),
                ]);

            setStatus(statusRes.data);
            setHistory(historyRes.data);
            setSchedules(scheduleRes.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
        socket.on("statusUpdated", () => {
        loadData();
    });

    return () => {
        socket.off("statusUpdated");
    };

    }, []);

    return (
        <div className="min-h-screen bg-slate-100">
    <Navbar />

    <div className="max-w-7xl mx-auto px-6 py-8">

        <StatusCard
            status={status}
            refresh={loadData}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">

            <StatusHistory history={history} />

            <ScheduleList schedules={schedules} />

        </div>

    </div>
</div>
    );
};

export default Home;