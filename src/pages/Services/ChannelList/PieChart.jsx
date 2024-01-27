import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartDynamicColor";

const PieChart = ({ dataColors, selectedRate, def, def1, def2 }) => {
  console.log("Pie chart def values" + def, def1, def2)
  const PieApexChartColors = getChartColorsArray(dataColors);


  const MSOShare = def1 / 100 * selectedRate
  const BroadCasterShare = def / 100 * selectedRate
  const MSODiscount = def2 * selectedRate

  const series = [MSOShare, BroadCasterShare, MSODiscount];
  const options = {
    chart: {
      height: 320,
      type: "pie",
    },
    series: [MSOShare, BroadCasterShare, MSODiscount],
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
