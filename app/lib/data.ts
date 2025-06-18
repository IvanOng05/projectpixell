import postgres from 'postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { delay } from "./utils";
import { NextResponse } from 'next/server';
export { sql };

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTestimonialsFromDB() {
  return await sql`SELECT * FROM testimonials`;
}

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;

    console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw[]>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC`;

    const latestInvoices = data.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0][0].count ?? '0');
    const numberOfCustomers = Number(data[1][0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2][0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2][0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable[]>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const data = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(data[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm[]>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const customers = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchProduk() {
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

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType[]>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export type Produk = {
  id_produk: number;
  nama_produk: string;
  harga: number;
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
  total_harga: number;
  status: string;
}

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
}

export interface DashboardData {
  summary: DashboardSummary;
  chartData: ChartData;
}

// Data fetching functions with artificial delay
export async function fetchProducts(): Promise<Produk[]> {
  await delay(1500); // Artificial delay to simulate loading
  const response = await fetch('/api/admin/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchTransactions(): Promise<Transaksi[]> {
  await delay(2000); // Artificial delay to simulate loading
  const response = await fetch('/api/admin/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

export async function fetchDashboardData(): Promise<DashboardData> {
  await delay(2000); // Artificial delay to simulate loading
  const response = await fetch('/api/admin/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}

// Individual data fetchers for Suspense implementation
export async function fetchProductCount(): Promise<number> {
  await delay(800);
  const data = await fetchDashboardData();
  return data.summary.totalProducts;
}

export async function fetchTransactionCount(): Promise<number> {
  await delay(2000);
  const data = await fetchDashboardData();
  return data.summary.totalTransactions;
}

export async function fetchActiveUsers(): Promise<number> {
  await delay(1400);
  const data = await fetchDashboardData();
  return data.summary.activeUsers;
}

export async function fetchTopSellingProduct(): Promise<string> {
  await delay(1600);
  const data = await fetchDashboardData();
  return data.summary.topSellingProduct;
}

export async function fetchRevenueData(): Promise<ChartData['revenueData']> {
  await delay(2000);
  const data = await fetchDashboardData();
  return data.chartData.revenueData;
}

export async function fetchTransaksi(query: string = '', currentPage: number = 1) {
  const ITEMS_PER_PAGE = 6;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Transaksi & { nama_produk: string }[]>`
      SELECT 
        t.id_transaksi,
        t.id_produk,
        t.nama_pembeli,
        t.tanggal::text,
        t.total_harga,
        t.status,
        p.nama_produk
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      WHERE p.nama_produk ILIKE ${`%${query}%`}
      ORDER BY t.tanggal DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Transaksi data.');
  }
}

// Fetch transaction by ID for editing
export async function fetchTransaksiById(id_transaksi: number) {
  try {
    const data = await sql<Transaksi[]>`
      SELECT 
        id_transaksi,
        id_produk,
        nama_pembeli,
        tanggal::text,
        total_harga,
        status
      FROM transaksi
      WHERE id_transaksi = ${id_transaksi}
    `;
    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch transaction.');
  }
}

// Fetch total pages for pagination
export async function fetchTransaksiPages(query: string = '') {
  try {
    const data = await sql`
      SELECT COUNT(*)
      FROM transaksi t
      JOIN produk p ON t.id_produk = p.id_produk
      WHERE p.nama_produk ILIKE ${`%${query}%`}
    `;
    const totalPages = Math.ceil(Number(data[0].count) / 6);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of transactions.');
  }
}

// Fetch products for form dropdown
export async function fetchProdukForForm() {
  try {
    const data = await sql<{ id_produk: number; nama_produk: string }[]>`
      SELECT id_produk, nama_produk
      FROM produk
      ORDER BY nama_produk ASC
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch products for form.');
  }
}


export async function fetchProdukPages(query: string) {
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM produk
      WHERE nama_produk ILIKE ${'%' + query + '%'}
    `;
    const totalPages = Math.ceil(Number(count[0].count) / 10);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product pages.');
  }
}

export async function fetchProdukById(id_produk: string | number) {
  try {
    // Convert and validate id_produk
    const parsedId = Number(id_produk);
    if (isNaN(parsedId) || parsedId <= 0) {
      throw new Error('Invalid product ID');
    }

    const produk = await sql<Produk[]>`
      SELECT id_produk, nama_produk, harga, deskripsi, stock, foto, kategori
      FROM produk
      WHERE id_produk = ${parsedId}
    `;
    return produk[0]; // Return the first (and only) product
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product by ID.');
  }
}

export async function fetchFilteredProduk(query: string = '', currentPage: number = 1) {
  const ITEMS_PER_PAGE = 10;
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const data = await sql<Produk[]>`
      SELECT 
        id_produk,
        nama_produk,
        harga,
        stock,
        foto,
        kategori,
        deskripsi
      FROM produk
      WHERE nama_produk ILIKE ${`%${query}%`}
      ORDER BY nama_produk ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Produk data.');
  }
}

// app/lib/data.ts
export const statictestimonials= [
  {
    id: 1,
    name: "John Doe",
    rating: 4.5,
    comment: "Produk ini sangat bagus dan worth it untuk harganya!",
    date: "2025-06-01",
    phoneModel: "Samsung Galaxy S23",
    avatarUrl: "/images/avatar1.jpg",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 5,
    comment: "Layanan cepat dan kualitas produk luar biasa.",
    date: "2025-06-05",
    phoneModel: "Vivo Y100",
    avatarUrl: "/images/avatar2.jpg",
  },
];