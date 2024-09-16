'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function StockChart({ data, market }) {
  if (!data || !data.financialData || data.financialData.length === 0) {
    return <div>No data available</div>;
  }

  const years = data.financialData.map((item) => item.date);
  const volumes = data.financialData.map((item) => item.volume);
  const prices = data.financialData.map((item) => item.price);
  const marketCaps = data.financialData.map((item) => item.marketCap);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: "Volume",
        data: volumes,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Price",
        data: prices,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
      {
        label: "Market Cap",
        data: marketCaps,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `Stock Data (${market} Market)`,
      },
    },
  };

  const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) {
      return 'N/A';
    }
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + "B";
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toFixed(2);
  };

  return (
    <div>
      <div className="mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Year
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Volume
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Price ({market === 'US' ? 'USD' : 'TWD'})
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
                Market Cap ({market === 'US' ? 'USD' : 'TWD'})
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {years.map((year, index) => (
              <tr key={year}>
                <td className="px-4 py-2 text-sm text-gray-900">{year}</td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {formatNumber(volumes[index])}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {formatNumber(prices[index])}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {formatNumber(marketCaps[index])}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

