import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { StatCardSkeleton, BestSellingProductSkeleton } from "@/app/ui/skeletons/CardsSkeletons";
import { ChartSkeleton } from "@/app/ui/skeletons/ChartSkeletons";
import { ProductTableSkeleton } from "@/app/ui/skeletons/ProductTableSkeletons";
import { TransactionTableSkeleton } from "@/app/ui/skeletons/TransactionTableSkeletons";

// Dynamic imports for server components
const AnalyticsPage = dynamic(() => import("./analytics/page"));
const ProductsPage = dynamic(() => import("./products/page"));
const TransactionsPage = dynamic(() => import("./transactions/page"));

export default function DashboardPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Navigation */}
      <header className="bg-purple-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/LOGOPIXELL.png" alt="PIXELL PHONE" width={120} height={40} priority />
        </div>
        <nav className="space-x-4">
          <a href="#beranda" className="hover:text-purple-200">Beranda</a>
          <a href="#daftar-transaksi" className="hover:text-purple-200">Daftar Transaksi</a>
          <a href="#daftar-produk" className="hover:text-purple-200">Daftar Produk</a>
        </nav>
        <button className="flex items-center bg-transparent border border-white rounded-full">
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
      </header>

      {/* Main Content */}
        <main className="p-4 sm:p-6 lg:p-8 bg-gray-100">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Welcome back to PIXELL PHONE admin panel!</p>
          </div>

          {/* Analytics Section */}
          <Suspense
            fallback={
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
            }
          >
            <AnalyticsPage />
          </Suspense>

          {/* Product Catalog Section */}
          <Suspense
            fallback={
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <ProductTableSkeleton />
              </div>
            }
          >
            <ProductsPage />
          </Suspense>

          {/* Recent Transactions Section */}
          <Suspense
            fallback={
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="h-6 w-44 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <TransactionTableSkeleton />
              </div>
            }
          >
            <TransactionsPage />
          </Suspense>
        </main>
    </div>
  );
}