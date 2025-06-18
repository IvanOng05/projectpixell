'use client';
import { Suspense, useState, useEffect } from 'react';
import { fetchDashboardData } from '@/app/lib/data.client';
import { StatCardSkeleton, BestSellingProductSkeleton } from '@/app/ui/skeletons/CardsSkeletons';
import { ChartSkeleton } from '@/app/ui/skeletons/ChartSkeletons';
import { AreaChart, BarChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <BestSellingProductSkeleton />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 text-sm">Total Products</h3>
            <span className="p-2 bg-purple-100 rounded-full text-purple-700">📦</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-800">{dashboardData.summary.totalProducts}</span>
            <span className="text-sm text-green-500 pb-1">+12% ↑</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 text-sm">Total Transactions</h3>
            <span className="p-2 bg-blue-100 rounded-full text-blue-700">💳</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-800">{dashboardData.summary.totalTransactions}</span>
            <span className="text-sm text-green-500 pb-1">+8% ↑</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 text-sm">Total Revenue</h3>
            <span className="p-2 bg-green-100 rounded-full text-green-700">💰</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-800">{dashboardData.summary.totalRevenue}</span>
            <span className="text-sm text-green-500 pb-1">+18% ↑</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-500 text-sm">Active Users</h3>
            <span className="p-2 bg-yellow-100 rounded-full text-yellow-700">👤</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-800">{dashboardData.summary.activeUsers}</span>
            <span className="text-sm text-green-500 pb-1">+5% ↑</span>
          </div>
        </div>
      </div>
      {dashboardData.summary.topSellingProduct && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Best Selling Product</h3>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full text-purple-700 mr-4">📱</div>
            <div>
              <p className="text-xl font-bold text-gray-800">{dashboardData.summary.topSellingProduct}</p>
              <p className="text-sm text-gray-600">Most popular product by number of sales</p>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Overview</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dashboardData.chartData.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue Statistics</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.chartData.revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="online" fill="#4f46e5" name="Online Sales" />
                <Bar dataKey="retail" fill="#10b981" name="Retail Sales" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}