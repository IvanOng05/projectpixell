import { fetchTransaksiById, fetchProdukForForm } from '@/app/lib/data';
import TransaksiForm from '../../components/TransaksiForm';
import { notFound } from 'next/navigation';
import { lusitana } from '@/app/ui/fonts';

export default async function EditTransaksiPage({ params }: { params: { id_transaksi: string } }) {
  const id_transaksi = Number(params.id_transaksi);
  if (isNaN(id_transaksi)) {
    notFound();
  }

  const [transaksi, products] = await Promise.all([
    fetchTransaksiById(id_transaksi),
    fetchProdukForForm(),
  ]);

  if (!transaksi) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-100 min-h-screen">
      <h1 className={`${lusitana.className} text-2xl font-bold mb-4 text-gray-800`}>
        Edit Transaksi
      </h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <TransaksiForm initialData={transaksi} products={products} id_transaksi={id_transaksi} />
      </div>
    </div>
  );
}