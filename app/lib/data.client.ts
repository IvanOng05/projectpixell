import { delay } from "./utils";
import { Produk, Transaksi, DashboardData } from "./definitions";
import { formatCurrency } from './utils';

// Enable delay only in development or for testing
const useDelay = process.env.NODE_ENV === "development";

export async function fetchProducts(): Promise<Produk[]> {
  if (useDelay) await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/products`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    const errorMessage = `Failed to fetch products: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchTransactions(): Promise<Transaksi[]> {
  if (useDelay) await delay(2000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/transactions`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    const errorMessage = `Failed to fetch transactions: ${response.status} ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const [products, transactions] = await Promise.all([
      fetchProducts(),
      fetchTransactions(),
    ]);

    // Calculate brand-specific sales
    const brandSales = products.reduce((acc: Record<string, { name: string; sales: number }>, product) => {
      const brand = (product.brand || 'Unknown').toLowerCase();
      const sales = transactions
        .filter(t => t.id_produk === product.id_produk)
        .reduce((sum, t) => sum + t.total_harga, 0);
      acc[brand] = { name: brand, sales };
      return acc;
    }, {});

    const summary: DashboardSummary = {
      totalProducts: products.length,
      totalTransactions: transactions.length,
      totalRevenue: formatCurrency(
        transactions.reduce((sum, t) => sum + t.total_harga, 0)
      ),
      activeUsers: new Set(transactions.map((t) => t.nama_pembeli)).size,
      topSellingProduct:
        products
          .sort((a, b) => {
            const aSales = transactions
              .filter(t => t.id_produk === a.id_produk)
              .reduce((sum, t) => sum + t.total_harga, 0);
            const bSales = transactions
             .filter(t => t.id_produk === b.id_produk)
              .reduce((sum, t) => sum + t.total_harga, 0);
            return bSales - aSales;
          })[0]?.nama_produk || "Unknown",
    };

    const chartData: ChartData = {
      revenueData: [
        { month: "Jan", online: 5000000, retail: 3200000 },
        { month: "Feb", online: 5500000, retail: 3400000 },
        { month: "Mar", online: 6200000, retail: 3800000 },
        { month: "Apr", online: 6800000, retail: 4100000 },
        { month: "May", online: 7500000, retail: 4600000 },
        { month: "Jun", online: 8200000, retail: 5000000 },
      ],
      brandSales: Object.values(brandSales),
    };

    return { summary, chartData };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data.');
  }
}