import postgres from 'postgres';
import { Produk, Transaksi, DashboardData } from './definitions';
import { formatCurrency } from './utils';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchProducts(): Promise<Produk[]> {
  try {
    console.log('Fetching Produk data...');
    await new Promise((resolve) => setTimeout(resolve, 6000));
    const data = await sql<Produk[]>`SELECT * FROM produk`;
    console.log('Data fetch completed after 6 seconds.');
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Produk data.');
  }
}

export async function fetchTransactions(): Promise<Transaksi[]> {
  try {
    const data = await sql<Transaksi[]>`SELECT * FROM transaksi ORDER BY tanggal DESC`;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Transaksi data.');
  }
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const [products, transactions] = await Promise.all([
      fetchProducts(),
      fetchTransactions(),
    ]);

    const summary = {
      totalProducts: products.length,
      totalTransactions: transactions.length,
      totalRevenue: formatCurrency(
        transactions.reduce((sum, t) => sum + t.total_harga, 0)
      ),
      activeUsers: new Set(transactions.map(t => t.nama_pembeli)).size,
      topSellingProduct: products.sort((a, b) => b.harga - a.harga)[0]?.nama_produk || 'N/A',
    };

    const chartData = {
      revenueData: [
        { month: 'Jan', online: 4000000, retail: 2400000 },
        { month: 'Feb', online: 3000000, retail: 1398000 },
        { month: 'Mar', online: 2000000, retail: 980000 },
        { month: 'Apr', online: 2780000, retail: 3900000 },
        { month: 'May', online: 1890000, retail: 4800000 },
        { month: 'Jun', online: 2390000, retail: 3800000 },
      ],
    };

    return { summary, chartData };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch dashboard data.');
  }
}