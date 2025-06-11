'use client';

import Image from 'next/image';
import { useState } from 'react';
import  Button  from '@/app/ui/button';

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const mockCart: CartItem[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 21999000,
    image: '/images/iphone15.png',
    quantity: 1,
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 19999000,
    image: '/images/galaxy-s24.png',
    quantity: 2,
  },
];

export default function CartPage() {
  const [cart, setCart] = useState(mockCart);

  const handleRemove = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="w-full px-4 md:px-10 lg:px-20 xl:px-32 py-12 space-y-10">
      <h1 className="text-3xl font-bold">Keranjang Saya</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Produk di Keranjang */}
        <div className="flex-1 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-xl shadow-sm">
              <Image src={item.image} alt={item.name} width={100} height={100} className="rounded-xl object-cover" />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p className="text-gray-600">Rp {item.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Jumlah: {item.quantity}</p>
              </div>
              <Button variant="destructive" onClick={() => handleRemove(item.id)}>
                Hapus
              </Button>
            </div>
          ))}
        </div>

        {/* Ringkasan & Checkout */}
        <div className="w-full lg:w-1/3 p-6 border rounded-xl shadow-md space-y-4">
          <h2 className="text-xl font-bold">Ringkasan Belanja</h2>
          <div className="flex justify-between text-gray-700">
            <span>Total</span>
            <span className="font-semibold">Rp {total.toLocaleString()}</span>
          </div>
          <Button className="w-full" size="lg">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}