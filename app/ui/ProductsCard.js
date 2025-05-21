"use client";

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ 
  id, 
  name, 
  image, 
  category, 
  price, 
  colors, 
  isFeatured 
}) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Map color names to Tailwind classes
  const colorClasses = {
    red: 'bg-red-500',
    gray: 'bg-gray-300',
    black: 'bg-black',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
    white: 'bg-white border border-gray-200',
    silver: 'bg-gray-300',
    pink: 'bg-pink-300'
  };

  return (
    <div className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${isFeatured ? 'border-2 border-purple-400' : 'border border-gray-200'}`}>
      {isFeatured && (
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full z-10">
          Featured
        </div>
      )}
      <Link href={`/produk/${id}`}>
        <div className="pt-6 px-4 flex items-center justify-center h-48">
          <Image
            src={image}
            alt={name}
            width={120}
            height={150}
            className="object-contain max-h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-4">
          <h3 className="font-bold text-gray-800">{name}</h3>
          <p className="text-xs text-gray-500 mb-2">{category}</p>
          
          <div className="flex items-center justify-between mb-3">
            <div className="flex space-x-1">
              {colors && colors.map((color, index) => (
                <span key={index} className={`w-3 h-3 rounded-full ${colorClasses[color] || 'bg-gray-300'}`}></span>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="font-bold text-purple-700">
              {formatPrice(price)}
            </span>
            <button className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded transition-colors">
              Detail
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}