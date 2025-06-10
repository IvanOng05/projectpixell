'use client';

import { Transaksi } from '@/app/lib/definitions';
import { createTransaksi, updateTransaksi } from '@/app/lib/actions';
import { useActionState, useState, useRef, useEffect } from 'react';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';

interface Product {
  id_produk: number;
  nama_produk: string;
  harga?: number;
}

interface TransaksiFormProps {
  initialData: Transaksi;
  products: Product[];
  id_transaksi?: number;
}

export default function TransaksiForm({
  initialData,
  products = [], // Default to empty array to prevent undefined
  id_transaksi,
}: TransaksiFormProps) {
  const action = id_transaksi ? updateTransaksi.bind(null, id_transaksi) : createTransaksi;
  const [state, formAction, isPending] = useActionState(action, null);
  const [selectedProductId, setSelectedProductId] = useState(initialData.id_produk);
  const [totalHarga, setTotalHarga] = useState(''); // Initialize as empty string
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Handle redirect on successful submission
  useEffect(() => {
    if (state?.success) {
      router.push('/admin/DaftarTransaksi');
    }
  }, [state, router]);

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    setSelectedProductId(initialData.id_produk);
    setTotalHarga(''); // Reset to empty on cancel
    router.replace('/admin/DaftarTransaksi');
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="id_produk" className="block text-sm font-medium text-gray-700">
          Produk
        </label>
        <select
          id="id_produk"
          name="id_produk"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        >
          <option value="">Pilih Produk</option>
          {products.length > 0 ? (
            products.map((product) => (
              <option key={product.id_produk} value={product.id_produk}>
                {product.nama_produk}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No products available
            </option>
          )}
        </select>
        {state?.error?.id_produk && (
          <p className="mt-1 text-sm text-red-600">{state.error.id_produk.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="nama_pembeli" className="block text-sm font-medium text-gray-700">
          Nama Pembeli
        </label>
        <input
          id="nama_pembeli"
          name="nama_pembeli"
          type="text"
          defaultValue={initialData.nama_pembeli}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.nama_pembeli && (
          <p className="mt-1 text-sm text-red-600">{state.error.nama_pembeli.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">
          Tanggal
        </label>
        <input
          id="tanggal"
          name="tanggal"
          type="date"
          defaultValue={initialData.tanggal as string}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.tanggal && (
          <p className="mt-1 text-sm text-red-600">{state.error.tanggal.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="total_harga" className="block text-sm font-medium text-gray-700">
          Total Harga
        </label>
        <input
          id="total_harga"
          name="total_harga"
          type="number"
          step="0.01"
          value={totalHarga}
          onChange={(e) => setTotalHarga(e.target.value)}
          placeholder="Masukkan total harga"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.total_harga && (
          <p className="mt-1 text-sm text-red-600">{state.error.total_harga.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={initialData.status}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        >
          <option value="Diproses">Diproses</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
        {state?.error?.status && (
          <p className="mt-1 text-sm text-red-600">{state.error.status.join(', ')}</p>
        )}
      </div>

      {state?.error && typeof state.error === 'string' && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : id_transaksi ? 'Update' : 'Tambah'}
        </Button>
        <button
          type="button"
          onClick={handleCancel}
          className="inline-flex items-center justify-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          Batal
        </button>
      </div>
    </form>
  );
}