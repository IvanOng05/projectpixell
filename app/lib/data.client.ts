// app/lib/data.client.ts
import { delay } from "./utils";
import { Produk, Transaksi, DashboardData } from "./definitions";

// Enable delay only in development or for testing
const useDelay = process.env.NODE_ENV === "development";

export async function fetchProducts(): Promise<Produk[]> {
  if (useDelay) await delay(1500); // 1.5s delay for testing
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/products`,
    { cache: "no-store" } // Ensure fresh data
  );
  if (!response.ok) {
    const errorMessage = `Failed to fetch products: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchTransactions(): Promise<Transaksi[]> {
  if (useDelay) await delay(3000); // 3s delay for testing
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/transactions`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    const errorMessage = `Failed to fetch transactions: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}

export async function fetchDashboardData(): Promise<DashboardData> {
  if (useDelay) await delay(2500); // 2.5s delay for testing
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/admin/dashboard`,
    { cache: "no-store" }
  );
  if (!response.ok) {
    const errorMessage = `Failed to fetch dashboard data: ${response.status} - ${response.statusText}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return response.json();
}