import { fetchProdukById } from '@/app/lib/data';
import ProdukForm from '../../components/ProdukForm';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';

export default async function EditProdukPage({ params }: { params: Promise<{ id_produk: string }> }) {
  const resolvedParams = await params; // Await the params Promise
  const id_produk = Number(resolvedParams.id_produk); // Now access id_produk safely

  if (isNaN(id_produk)) {
    notFound();
  }

  const produk = await fetchProdukById(id_produk);

  if (!produk) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-4 text-gray-800`}>
        Edit Produk
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <ProdukForm initialData={produk} id_produk={id_produk} />
      </div>
    </div>
  );
}