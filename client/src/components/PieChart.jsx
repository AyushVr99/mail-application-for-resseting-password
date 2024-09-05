import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axios from "axios";

const PieChart = () => {
  const chartRef = useRef(null); // Reference for the canvas element
  const [chartData, setChartData] = useState({ labels: [], data: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/linedata');
        setChartData({ labels: response.data.labels, data: response.data.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d")

    // Create the Pie chart instance
    const myPieChart = new Chart(ctx, {
      type: "pie", // Specify the chart type
      data: {
        labels: chartData.labels, // Pie chart labels
        datasets: [
          {
            label: "Votes",
            data: chartData.data, // Data points for each section
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
              "rgba(255, 206, 86, 0.6)",
              "rgba(75, 192, 192, 0.6)",
              "rgba(153, 102, 255, 0.6)",
              "rgba(255, 159, 64, 0.6)",
              "rgba(255, 159, 64, 0.6)",
            ], // Background colors for each section
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
              "rgba(255, 159, 64, 1)",
            ], // Border colors for each section
            borderWidth: 1, // Border width of each section
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "top", // Position of the legend
          },
          title: {
            display: true,
            text: "Votes Distribution", // Title of the chart
          },
        },
      },
    });

    // Cleanup function to destroy the chart when the component is unmounted
    return () => {
      myPieChart.destroy();
    };
  }, [chartData]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <canvas ref={chartRef}></canvas> {/* Canvas element for rendering the chart */}
    </div>
  );
};

export default PieChart;
