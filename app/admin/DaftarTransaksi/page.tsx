import { Suspense } from 'react';
import DaftarTransaksi from './components/DaftarTransaksi';
import { TransactionTableSkeleton } from "@/app/ui/skeletons/TransactionTableSkeletons";
import { fetchTransaksi, fetchTransaksiPages, fetchProdukForForm } from '@/app/lib/data';

export default async function TransaksiPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;
  const currentPage = Number(page) || 1;

  const [transaksi, totalPages, products] = await Promise.all([
    fetchTransaksi(query, currentPage),
    fetchTransaksiPages(query),
    fetchProdukForForm(),
  ]);

  return (
    <Suspense fallback={<TransactionTableSkeleton />}>
      <DaftarTransaksi initialData={transaksi} totalPages={totalPages} products={products} />
    </Suspense>
  );
}