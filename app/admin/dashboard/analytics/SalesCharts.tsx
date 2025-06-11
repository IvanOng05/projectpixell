'use client';
import { useState, useEffect } from 'react';
import { fetchDashboardData } from '@/app/lib/data.client';
import {
  AreaChart,
  BarChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData, DashboardData } from '@/app/lib/definitions';

type ChartType = 'area' | 'bar';

interface SalesChartsProps {
  type: ChartType;
  title: string;
}

export default function SalesCharts({ type, title }: SalesChartsProps) {
  const [salesData, setSalesData] = useState<ChartData['revenueData']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data: DashboardData = await fetchDashboardData();
        setSalesData(data.chartData.revenueData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-md shadow-lg shadow-sm p-5">
        <div className="h-5 bg-gray-300 rounded-full w-32 mb-2"></div>
        <div className="h-64 w-full bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          {type === 'area' ? (
            <AreaChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              aria-label="`${title} sales chart`"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
              <Area
                type="monotone"
                dataKey="online"
                stackId="1"
                stroke="#4f46e5"
                fill="#818cf8"
                fillOpacity={0.3}
                name="Online Sales"
              />
              <Area
                type="monotone"
                dataKey="retail"
                stackId="1"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
                name="Retail Sales"
              />
            </AreaChart>
          ) : (
            <BarChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              aria-label="`${title} revenue chart`"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString()}`} />
              <Legend />
              <Bar dataKey="online" fill="#4f46e5" name="Online Sales" />
              <Bar dataKey="retail" fill="#10b981" name="Retail Sales" />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}