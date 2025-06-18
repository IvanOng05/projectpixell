// app/lib/definitions.ts
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerField = {
  id: string;
  name: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type Produk = {
  id_produk: number;
  nama_produk: string;
  harga: number;
  stock: number;
  foto: string | null | undefined; // Allow null/undefined for robustness
  kategori: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  brand?: string | null; // Added for ShopPage.tsx
  isFeatured?: boolean; // Added for ShopPage.tsx
};

export type Transaksi = {
  id_transaksi: number;
  id_produk: number; // Explicitly included
  nama_pembeli: string;
  tanggal: string | Date;
  total_harga: number;
  status: string;
};

export type BrandSalesData = {
  name: string;
  sales: number;
};

export interface DashboardSummary {
  totalProducts: number;
  totalTransactions: number;
  totalRevenue: string;
  activeUsers: number;
  topSellingProduct: string;
}

export interface ChartData {
  revenueData: {
    month: string;
    online: number;
    retail: number;
  }[];
  brandSales: BrandSalesData[]; // Added for brand analytics
}

export interface DashboardData {
  summary: DashboardSummary;
  chartData: ChartData;
}

export type Produk1 = {
  id_produk: string;
  nama_produk: string;
  harga: number;
  stock: number;
  foto: string;
  kategori: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  brand?: string | null;
  isFeatured?: boolean;
};