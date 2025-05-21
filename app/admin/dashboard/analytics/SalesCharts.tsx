// app/admin/dashboard/analytics/SalesCharts.tsx
'use client';
import { useState, useEffect } from 'react';
import { fetchDashboardData } from '@/app/lib/data.client';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function SalesCharts() {
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRevenue() {
      try {
        const data = await fetchDashboardData();
        setRevenueData(data.chartData.revenueData);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadRevenue();
  }, []);

  if (loading) {
    return <div className="bg-white rounded-lg shadow p-6 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-32 mb-4"></div>
      <div className="h-64 bg-gray-200 rounded"></div>
    </div>;
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
              <Area type="monotone" dataKey="online" stackId="1" stroke="#4f46e5" fill="#818cf8" fillOpacity={0.3} name="Online Sales" />
              <Area type="monotone" dataKey="retail" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Retail Sales" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Repeat for Revenue Statistics chart */}
    </>
  );
}