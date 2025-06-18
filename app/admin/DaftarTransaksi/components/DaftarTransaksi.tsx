'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TransaksiForm from './TransaksiForm';
import { deleteTransaksi, createTransaksi } from '@/app/lib/actions';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Search from '@/app/ui/search';
import Pagination from '@/app/ui/pagination';
import { Transaksi } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';
import { formatCurrency, formatDate } from '@/app/lib/utils';
import Link from 'next/link';

export default function DaftarTransaksi({
  initialData,
  totalPages,
  products,
}: {
  initialData: (Transaksi & { nama_produk: string })[];
  totalPages: number;
  products: { id_produk: number; nama_produk: string }[];
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const currentPage = Number(searchParams.get('page')) || 1;
  const router = useRouter();

  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const emptyTransaksi: Transaksi = {
    id_transaksi: 0,
    id_produk: 0,
    nama_pembeli: '',
    tanggal: new Date().toISOString().split('T')[0],
    total_harga: 0,
    status: 'Diproses',
  };

  const handleAddButtonClick = () => {
    setShowAddForm(true);
  };

  const handleDelete = async (id_transaksi: number) => {
    const result = await deleteTransaksi(id_transaksi);
    if (result?.error) {
      setError(result.error);
    } else {
      router.refresh();
    }
  };

  // Fallback client-side sorting if server doesn't sort
  const sortedData = [...initialData].sort((a, b) => a.id_transaksi - b.id_transaksi);

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-4 text-gray-800`}>Daftar Transaksi</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex-grow">
          <Search placeholder="Cari transaksi berdasarkan nama produk..." />
        </div>
        <button
          onClick={handleAddButtonClick}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2 transition-colors"
        >
          <PlusIcon className="h-5 w-5" />
          Tambah Transaksi
        </button>
      </div>

      {showAddForm && (
        <div className="p-4 bg-white rounded-xl shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tambah Transaksi Baru</h2>
          <TransaksiForm initialData={emptyTransaksi} products={products} />
        </div>
      )}

      {error && <div className="p-4 mb-6 text-red-500 bg-red-100 rounded">{error}</div>}

      {sortedData.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <p className="text-gray-600">Tidak ada transaksi yang ditemukan.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">ID Transaksi</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Nama Produk</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Nama Pembeli</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Tanggal Transaksi</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Total Harga</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedData.map((transaksi) => (
                <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{transaksi.id_transaksi}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaksi.nama_produk || 'N/A'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaksi.nama_pembeli}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatDate(transaksi.tanggal)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(transaksi.total_harga)}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        transaksi.status === 'Selesai'
                          ? 'bg-green-100 text-green-700'
                          : transaksi.status === 'Diproses'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {transaksi.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <Link
                      href={`/admin/DaftarTransaksi/${transaksi.id_transaksi}/edit`}
                      className="inline-block text-blue-600 hover:text-blue-800"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </Link>
                    <form action={async () => { await handleDelete(transaksi.id_transaksi); }} className="inline">
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
