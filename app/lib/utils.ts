// app/lib/utils.ts
import { Revenue } from "./definitions";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Formats a date to 'DD-MM-YYYY' format for Indonesian locale.
 * @param date - A Date object or string to format.
 * @returns Formatted date string or 'Invalid date' if invalid.
 */
export function formatDate(date: Date | string): string {
  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) {
    return "Invalid date";
  }

  return dateObj.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).replace(/\//g, "-");
}

/**
 * Formats a number as Indonesian Rupiah currency.
 * @param value - The number to format (defaults to 0 if invalid).
 * @returns Formatted currency string (e.g., 'Rp 1.234.567').
 */
export function formatCurrency(amount: number | string) {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numericAmount)) return 'Rp 0.00';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/**
 * Generates y-axis labels based on revenue data.
 * @param revenue - Array of revenue objects with a 'revenue' property.
 * @param currencySymbol - Optional currency symbol (defaults to '$').
 * @returns Object with yAxisLabels and topLabel.
 */
export const generateYAxis = (
  revenue: Revenue[],
  currencySymbol: string = "$"
): { yAxisLabels: string[]; topLabel: number } => {
  if (!revenue?.length) return { yAxisLabels: [], topLabel: 0 };
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  const yAxisLabels = [];
  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`${currencySymbol}${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

/**
 * Generates pagination array with ellipsis for large page counts.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @returns Array of page numbers and ellipsis ('...').
 */
export const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  if (totalPages < 1) return [];
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

/**
 * Combines Tailwind CSS classes using clsx and twMerge.
 * @param inputs - Class values to merge.
 * @returns Combined class string.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Adds a delay for testing loading states (only in development).
 * @param ms - Delay duration in milliseconds.
 * @returns Promise that resolves after the delay.
 */
export async function delay(ms: number): Promise<void> {
  if (process.env.NODE_ENV !== "development") return Promise.resolve();
  return new Promise((resolve) => setTimeout(resolve, ms));
}