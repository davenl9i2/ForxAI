import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, TimeScale);

export default function LineChart({ data }) {
  const options = {
    responsive: true,
    scales: {
      x: { type: "time", time: { unit: "day" } },
      y: { beginAtZero: false },
    },
  };

  const chartData = {
    datasets: [
      {
        label: "折線圖",
        data,
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.2)",
      },
    ],
  };

  return <Line data={chartData} options={options} />;
}