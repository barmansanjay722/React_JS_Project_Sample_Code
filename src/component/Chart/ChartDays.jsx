import Chart from "react-apexcharts";
import { useState } from "react";
import React from "react";

const RadialBarDays = ({days}) => {

  const [status] = useState({
    options: {
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            background: "#ffffff10",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
            dropShadow: {
              enabled: true,
              top: 3,
              left: 0,
              blur: 4,
              opacity: 0.24,
            },
          },
          track: {
            background: "#fff",
            strokeWidth: "70%",
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: -3,
              left: 0,
              blur: 4,
              opacity: 0.35,
            },
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: ["#a2238f"],
          // gradientToColors: ['var(--chart-color1)'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [10, 100],
        },
      },
      colors: ["#EC1855"],
      // color : ['var(--chart-color2)'],
      stroke: {
        lineCap: "round",
      },
      labels: ["Days"],
    },

    series: [days],
  });
  // useEffect(()=>{
    
  //     setDay(days);
  
  // },[setDay]);

  return (
    <>
      <div className="donut">
        <Chart
          options={status.options}
          series={status.series}
          type="radialBar"
          height="240px"
        />
      </div>
    </>
  );
};

export default RadialBarDays;
