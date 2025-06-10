import { Suspense } from 'react';
import DaftarProduk from './components/DaftarProduk';
import { ProductTableSkeleton } from "@/app/ui/skeletons/ProductTableSkeletons";
import { fetchFilteredProduk, fetchProdukPages } from '@/app/lib/data';

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;
  const currentPage = Number(page) || 1;

  const [produk, totalPages] = await Promise.all([
    fetchFilteredProduk(query, currentPage),
    fetchProdukPages(query),
  ]);

  return (
    <Suspense fallback={<ProductTableSkeleton />}>
      <DaftarProduk initialData={produk} totalPages={totalPages} />
    </Suspense>
  );
}