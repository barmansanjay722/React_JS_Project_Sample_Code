import "./Chat.css";
import Chart from "react-apexcharts";
import React from "react";
import { useState, useEffect } from "react";
import { getChartData } from "../../services/dashboardService";
import { ThreeDots } from "react-loader-spinner";
const ChartDashboard = ({ chartDuration }) => {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchRecords = async () => {
    const date = [];
    const count = [];
    let req = { days: chartDuration };
    const response = await getChartData(req);
  
    setLoader(false);
    if (response.status === 200) {
      response?.data.map((item) => {
        date.push(item.date);
        count.push(item.count);
        setLoader(false);
      });
    }
    setCategory(date);
    setData(count);
  };

  useEffect(() => {
    setLoader(true);
    fetchRecords();
  }, [chartDuration]);

  return (
    <>
      {" "}
      {loader ? (
        <div className="col-2" style={{ float: "none", margin: "auto" }}>
          <ThreeDots
            height="40"
            width="40"
            radius="9"
            color="#a2238f"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <Chart
          options={{
            colors: ["var(--chart-color1)", "var(--chart-color5)"],
            chart: {
              id: "apexchart",
            },
            xaxis: {
              categories: category,
            },
          }}
          series={[
            {
              name: "active-users",
              data: data,
            },
          ]}
          type="line"
          height={320}
          legend="false"
        />
      )}
    </>
  );
};
export default ChartDashboard;
