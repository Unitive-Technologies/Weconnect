import React from "react";
import ReactApexChart from "react-apexcharts";
import getChartColorsArray from "../../../components/Common/ChartDynamicColor";
import PropTypes from "prop-types";

const ViewPieChart = ({
  dataColors,
  selectedRate,
  broadPercent,
  msoPercent,
  discountPercent,
}) => {
  console.log(
    "selectedRate in piechart: " + typeof selectedRate,
    selectedRate,
    typeof broadPercent,
    broadPercent,
    typeof msoPercent,
    msoPercent,
    typeof discountPercent,
    discountPercent,
    typeof dataColors
  );

  const PieApexChartColors = getChartColorsArray(dataColors);

  const BroadCasterShare = (broadPercent * selectedRate) / 100;
  const MSOShare = (msoPercent * selectedRate) / 100;
  const MSODiscount = (discountPercent * selectedRate) / 100;

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

ViewPieChart.propTypes = {
  selectedRate: PropTypes.string,
  broadPercent: PropTypes.number,
  msoPercent: PropTypes.number,
  discountPercent: PropTypes.number,
  dataColors: PropTypes.string,
};

export default ViewPieChart;
