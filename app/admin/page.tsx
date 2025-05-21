"use client";
import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import { formatDate } from '@/app/lib/utils';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

type Produk = {
  id_produk: number;
  nama_produk: string; // Pastikan nama field sesuai dengan database
  harga: number;       // Pastikan nama field sesuai dengan database
  stock: number;
  foto: string;
  kategori: string;
  deskripsi: string;
}

export type Transaksi = {
  id_transaksi: number;
  id_produk: number;
  nama_pembeli: string;
  tanggal: string | Date;
  total_harga: number;  // Diubah dari Text ke number untuk konsistensi dengan database
  status: string;       // Ditambahkan kolom status yang ada di database dan frontend
}

interface DashboardSummary {
  totalProducts: number;
  totalTransactions: number;
  totalRevenue: string;
  activeUsers: number;
  topSellingProduct: string;
}

interface ChartData {
  revenueData: {
    month: string;
    online: number;
    retail: number;
  }[];
}

interface DashboardData {
  summary: DashboardSummary;
  chartData: ChartData;
}

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState<Produk[]>([]);
  const [transactions, setTransactions] = useState<Transaksi[]>([]);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productsResponse = await fetch('/api/admin/products');
        const productsData = await productsResponse.json();

        const transactionsResponse = await fetch('/api/admin/transactions');
        const transactionsData = await transactionsResponse.json();

        const dashboardResponse = await fetch('/api/admin/dashboard');
        const dashboardData = await dashboardResponse.json();

        setProducts(Array.isArray(productsData) ? productsData : []);
        setTransactions(Array.isArray(transactionsData) ? transactionsData : []);
        setDashboardData(dashboardData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple-700 border-r-transparent"></div>
          <p className="mt-2 text-gray-700">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-red-600 text-xl font-bold mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            className="mt-4 bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      <div>
        <button className="flex items-center bg-transparent border border-white rounded-full mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back to PIXELL PHONE admin panel!</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm">Total Products</h3>
                <span className="p-2 bg-purple-100 rounded-full text-purple-700">&#128230;</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData?.summary.totalProducts || 0}</span>
                <span className="text-sm text-green-500 pb-1">+12% ↑</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm">Total Transactions</h3>
                <span className="p-2 bg-blue-100 rounded-full text-blue-700">&#128179;</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData?.summary.totalTransactions || 0}</span>
                <span className="text-sm text-green-500 pb-1">+8% ↑</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm">Total Revenue</h3>
                <span className="p-2 bg-green-100 rounded-full text-green-700">&#128176;</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData?.summary.totalRevenue || 'Rp 0'}</span>
                <span className="text-sm text-green-500 pb-1">+18% ↑</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 text-sm">Active Users</h3>
                <span className="p-2 bg-yellow-100 rounded-full text-yellow-700">&#128100;</span>
              </div>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-bold text-gray-800">{dashboardData?.summary.activeUsers || 0}</span>
                <span className="text-sm text-green-500 pb-1">+5% ↑</span>
              </div>
            </div>
          </div>

          {/* Top Selling Product */}
          {dashboardData?.summary.topSellingProduct && (
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

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Sales Overview</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dashboardData?.chartData?.revenueData || []}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => `Rp ${value.toLocaleString()}`} />
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
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Revenue Statistics</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={dashboardData?.chartData?.revenueData || []}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
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

          {/* Recent Products */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Product Catalog</h2>
              <button className="text-purple-700 hover:text-purple-800 text-sm font-medium">View All</button>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((produk) => (
                    <tr key={produk.id_produk} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-700">{produk.id_produk}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                        <div className="flex items-center">
                          <div>
                            {produk.nama_produk}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{produk.kategori}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(produk.harga)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">{produk.stock}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-purple-700 hover:text-purple-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
              <button className="text-purple-700 hover:text-purple-800 text-sm font-medium">View All</button>
            </div>
            <div className="bg-white overflow-hidden shadow-sm rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Produk</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((Transaksi) => (
                      <tr key={Transaksi.id_transaksi} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-700">{Transaksi.id_transaksi}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(Transaksi.tanggal)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{Transaksi.nama_pembeli}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{Transaksi.id_produk}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(Transaksi.total_harga))}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          { <span className={`px-2 py-1 text-xs rounded-full ${Transaksi.status === 'Completed' ? 'bg-green-100 text-green-800' :
                              Transaksi.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                            }`}>
                            {Transaksi.status}
                          </span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;