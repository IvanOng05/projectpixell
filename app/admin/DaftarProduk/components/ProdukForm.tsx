'use client';

import { Produk } from '@/app/lib/definitions';
import { createProduk, updateProduk } from '@/app/lib/actions';
import { useActionState, useRef, useEffect } from 'react';
import Button from '@/app/ui/button';
import { useRouter } from 'next/navigation';

interface ProdukFormProps {
  initialData: Produk;
  id_produk?: number;
}

export default function ProdukForm({
  initialData,
  id_produk,
}: ProdukFormProps) {
  const action = id_produk ? updateProduk.bind(null, id_produk) : createProduk;
  const [state, formAction, isPending] = useActionState(action, null);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Handle redirect on successful submission
  useEffect(() => {
    if (state?.success) {
      router.push('/admin/DaftarProduk'); // Redirect on success
    }
  }, [state, router]);

  const handleCancel = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
    router.replace('/admin/DaftarProduk');
  };

  return (
    <form ref={formRef} action={formAction} className="space-y-4">
      <div>
        <label htmlFor="nama_produk" className="block text-sm font-medium text-gray-700">
          Nama Produk
        </label>
        <input
          id="nama_produk"
          name="nama_produk"
          type="text"
          defaultValue={initialData.nama_produk}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.nama_produk && (
          <p className="mt-1 text-sm text-red-600">{state.error.nama_produk.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="harga" className="block text-sm font-medium text-gray-700">
          Harga
        </label>
        <input
          id="harga"
          name="harga"
          type="number"
          step="0.01"
          defaultValue={initialData.harga}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.harga && (
          <p className="mt-1 text-sm text-red-600">{state.error.harga.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          defaultValue={initialData.stock}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.stock && (
          <p className="mt-1 text-sm text-red-600">{state.error.stock.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="foto" className="block text-sm font-medium text-gray-700">
          URL Foto
        </label>
        <input
          id="foto"
          name="foto"
          type="text"
          defaultValue={initialData.foto}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
        />
        {state?.error?.foto && (
          <p className="mt-1 text-sm text-red-600">{state.error.foto.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="kategori" className="block text-sm font-medium text-gray-700">
          Kategori
        </label>
        <input
          id="kategori"
          name="kategori"
          type="text"
          defaultValue={initialData.kategori}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          required
        />
        {state?.error?.kategori && (
          <p className="mt-1 text-sm text-red-600">{state.error.kategori.join(', ')}</p>
        )}
      </div>

      <div>
        <label htmlFor="deskripsi" className="block text-sm font-medium text-gray-700">
          Deskripsi
        </label>
        <textarea
          id="deskripsi"
          name="deskripsi"
          defaultValue={initialData.deskripsi}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm"
          rows={4}
        />
        {state?.error?.deskripsi && (
          <p className="mt-1 text-sm text-red-600">{state.error.deskripsi.join(', ')}</p>
        )}
      </div>

      {state?.error && typeof state.error === 'string' && (
        <p className="text-sm text-red-600">{state.error}</p>
      )}

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Submitting...' : id_produk ? 'Update' : 'Tambah'}
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