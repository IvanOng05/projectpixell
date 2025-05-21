// app/lib/data.client.ts
import { delay } from './utils';
import { Produk, Transaksi, DashboardData } from './definitions';

export async function fetchProducts(): Promise<Produk[]> {
  await delay(1500);
  const response = await fetch('/api/admin/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
}

export async function fetchTransactions(): Promise<Transaksi[]> {
  await delay(3000);
  const response = await fetch('/api/admin/transactions');
  if (!response.ok) {
    throw new Error('Failed to fetch transactions');
  }
  return response.json();
}

export async function fetchDashboardData(): Promise<DashboardData> {
  await delay(2500);
  const response = await fetch('/api/admin/dashboard');
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard data');
  }
  return response.json();
}