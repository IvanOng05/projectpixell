import { Suspense } from 'react';
import { fetchTransactions } from '@/app/lib/data.server';
import { TransactionTableSkeleton } from '@/app/ui/skeletons/TransactionTableSkeletons';
import { formatDate } from '@/app/lib/utils';

export default async function TransactionsPage() {
  const transactions = await fetchTransactions();
  return (
    <Suspense fallback={<TransactionTableSkeleton />}>
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
          <button className="text-purple-700 hover:text-purple-800 text-sm font-medium">View All</button>
        </div>
        <div className="bg-white overflow-hidden shadow-sm rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Transaksi</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Pelanggan</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Produk</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transactions.map((transaksi) => (
                  <tr key={transaksi.id_transaksi} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-purple-700">{transaksi.id_transaksi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(transaksi.tanggal)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{transaksi.nama_pembeli}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{transaksi.id_produk}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(transaksi.total_harga))}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${transaksi.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        transaksi.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                        {transaksi.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Suspense>
  );
}