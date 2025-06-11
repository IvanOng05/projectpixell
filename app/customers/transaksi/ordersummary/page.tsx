'use client';

import  Button  from '@/app/ui/button';

export default function OrderSummaryPage() {
  const mockCart = [
    { name: 'iPhone 14 Pro', qty: 1, price: 18999000 },
    { name: 'Samsung Galaxy S23', qty: 1, price: 15999000 },
  ];

  const totalPrice = mockCart.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-12 space-y-10">
      <h1 className="text-3xl font-bold text-center">Ringkasan Pemesanan</h1>

      {/* Produk */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Produk</h2>
        <ul className="divide-y">
          {mockCart.map((item, index) => (
            <li key={index} className="py-2 flex justify-between">
              <span>{item.qty}x {item.name}</span>
              <span>Rp{item.price.toLocaleString('id-ID')}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pengiriman & Pembayaran */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Informasi</h2>
        <div className="text-sm text-gray-700">
          <p><strong>Nama:</strong> Budi Santoso</p>
          <p><strong>Alamat:</strong> Jl. Contoh No. 123, Jakarta</p>
          <p><strong>Metode Pembayaran:</strong> Kartu Debit/Kredit</p>
          <p><strong>Pengiriman:</strong> Ekspedisi Kilat</p>
        </div>
      </div>

      {/* Total */}
      <div className="flex justify-between items-center text-lg font-bold border-t pt-4">
        <span>Total</span>
        <span>Rp{totalPrice.toLocaleString('id-ID')}</span>
      </div>

      <Button className="w-full mt-4">
        Bayar Sekarang
      </Button>
    </div>
  );
}