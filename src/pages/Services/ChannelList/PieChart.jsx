import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartDynamicColor";

const PieChart = ({ dataColors }) => {
  const PieApexChartColors = getChartColorsArray(dataColors);

  const series = [44, 55, 41];
  const options = {
    chart: {
      height: 320,
      type: "pie",
    },
    series: [44, 55, 41],
    labels: ["Broadcaster Share", "MSO  Share", "MSO Discount"],
    colors: PieApexChartColors,
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: false,
      fontSize: "14px",
      offsetX: 0,
    },
    responsive: [
      {
        breakpoint: 600,
        options: {
          chart: {
            height: 240,
          },
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <ReactApexChart options={options} series={series} type="pie" height="320" />
  );
};

export default PieChart;
