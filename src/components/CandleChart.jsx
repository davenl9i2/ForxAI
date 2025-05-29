// ✅ src/components/CandleChart.jsx
import { Chart as ChartJS, LinearScale, TimeScale, Tooltip, Legend, Title } from "chart.js";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import { Chart } from "react-chartjs-2";
import "chartjs-adapter-date-fns";

// 正確註冊 chart.js 與 chartjs-chart-financial 所需元件
ChartJS.register(
  CandlestickController,
  CandlestickElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend,
  Title
);

const CandleChart = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: "K 線圖",
        data,
        color: {
          up: "#16a34a",
          down: "#dc2626",
          unchanged: "#9ca3af",
        },
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
          tooltipFormat: "yyyy/MM/dd",
        },
        ticks: {
          maxRotation: 0,
        },
      },
      y: {
        title: {
          display: true,
          text: "價格",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return <Chart type="candlestick" data={chartData} options={options} />;
};

export default CandleChart;
