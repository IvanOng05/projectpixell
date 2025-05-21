'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const images = [
  '/iphone.png',
  '/iphone.png',
  '/iphone.png', // tambahkan lebih banyak gambar jika ada
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  return (
    <div className="relative w-full mt-[60px] overflow-hidden">
      <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Slide ${index + 1}`}
            width={920}
            height={100}
            className="w-full object-cover"
            priority
          />
        ))}
      </div>

      {/* Tombol kiri */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 z-30 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-70"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </button>

      {/* Tombol kanan */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 z-30 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-70"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}