import ChartDashboard from "../../../Chart/ChartDashboard";
import { useState } from "react";
const AdminChart = () => {
    const [chartDuration, setChartDuration] = useState(7);

    return (
        <>
            <div className="card" >
                <div className="card-header">
                    <h6 className="card-title m-0">Active Users</h6>
                    <div className="dropdown morphing scale-left">
                        <div className="btn-group d-flex">
                            <button type="button" className={chartDuration === 7 ? "btn btn-secondary" : "btn btn-outline-secondary"} onClick={(e) => setChartDuration(7)}>
                                {" "}
                                Last 7 days
                            </button>

                            <button type="button" className={chartDuration === 30 ? "btn btn-secondary" : "btn btn-outline-secondary"} onClick={(e) => setChartDuration(30)}>
                                {" "}
                                Last 30 days
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body pt-0 border-top">
                    <ChartDashboard chartDuration={chartDuration} />
                </div>
            </div>
        </>
    );
};
export default AdminChart;
