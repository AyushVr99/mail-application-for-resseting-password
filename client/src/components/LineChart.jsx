import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto"; 
import axios from 'axios';


const LineChart = () => {
  // Create a reference to the canvas element
  const chartRef = useRef(null);
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
    const ctx = chartRef.current.getContext("2d");

    // Define the chart data and configuration
    const myChart = new Chart(ctx, {
      type: "line", // Chart type
      data: {
        labels: chartData.labels, // X-axis labels
        datasets: [
          {
            label: "Sales for 2024 (in USD)", // Chart label
            data: chartData.data, // Data points
            fill: false, // Do not fill under the line
            borderColor: "rgb(75, 192, 192)", // Line color
            tension: 0.1, // Line tension (curved lines)
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
            text: "Sales Data for 2024", // Chart title
          },
        },
      },
    });

    // Cleanup the chart when the component is unmounted
    return () => {
      myChart.destroy();
    };
  }, [chartData]);

  return(
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <canvas ref={chartRef}></canvas>
    </div>
  )
  
};

export default LineChart;
