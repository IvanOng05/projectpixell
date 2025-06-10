'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProdukForm from './ProdukForm';
import { deleteProduk } from '@/app/lib/actions';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/pagination';
import { Produk } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import { formatCurrency } from '@/app/lib/utils';
import Link from 'next/link';

export default function DaftarProduk({
  initialData,
  totalPages,
}: {
  initialData: Produk[];
  totalPages: number;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const emptyProduk: Produk = {
    id_produk: 0,
    nama_produk: '',
    harga: 0,
    stock: 0,
    foto: '',
    kategori: '',
    deskripsi: '',
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleDelete = async (id_produk: number) => {
    const result = await deleteProduk(id_produk);
    if (result?.error) {
      setError(result.error);
    } else {
      // Refresh halaman untuk memastikan data terbaru dari server
      router.refresh();
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-4 text-gray-800`}>Daftar Produk</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <Search placeholder="Cari produk berdasarkan nama..." />
        </div>
        <button
          onClick={handleAddButtonClick}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Produk
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-white rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Produk Baru</h2>
          <ProdukForm initialData={emptyProduk} />
        </div>
      )}

      {error && <div className="p-4 mb-6 text-red-500 bg-red-100 rounded">{error}</div>}

      {initialData.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Tidak ada produk yang ditemukan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID Produk</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Nama Produk</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Harga</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Stock</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Kategori</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {initialData.map((produk) => (
                <tr key={produk.id_produk} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{produk.id_produk}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{produk.nama_produk}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(produk.harga)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{produk.stock}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{produk.kategori}</td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link
                      href={`/admin/DaftarProduk/${produk.id_produk}/edit`}
                      className="inline-block text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <form action={async () => { await handleDelete(produk.id_produk); }} className="inline">
                      <button type="submit" className="text-red-600 hover:text-red-800">
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-6">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}