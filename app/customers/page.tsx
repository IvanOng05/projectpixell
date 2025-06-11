"use client";

import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/app/ui/carousel';
import { FaSearch, FaShoppingCart, FaStar, FaTag, FaFire, FaBell } from 'react-icons/fa';
import Footer from "@/app/ui/footer";
import { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

function FlashSaleTimer() {
  const [timeLeft, setTimeLeft] = useState('');
  
  useEffect(() => {
    // Function to calculate time left
    const calculateTimeLeft = () => {
      // Get Indonesia Western Time (UTC+7)
      const now = new Date();
      const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
      const wibTime = new Date(utcTime + (7 * 60 * 60 * 1000));
      
      // Set end time to midnight WIB
      const endTime = new Date(wibTime);
      endTime.setHours(23, 59, 59, 999);
      
      // Calculate time difference
      const diff = endTime - wibTime;
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      // Format time
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    
    // Update timer every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Initial call
    setTimeLeft(calculateTimeLeft());
    
    // Cleanup
    return () => clearInterval(timer);
  }, []);
  
  return timeLeft;
}

export default function CustomerDashboardPage() {
  const timerValue = FlashSaleTimer();
  return (
    <div className="w-full overflow-x-hidden bg-gray-50">
      {/* Hero Section with Carousel */}
      <div className="relative">
        <div className="rounded-b-3xl overflow-hidden shadow-lg">
          <Carousel />
        </div>
        
        {/* Quick Access Search Overlay */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4">
          <div className="bg-white rounded-xl shadow-lg p-4 max-w-4xl mx-auto">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="pl-4">
                <FaSearch className="text-purple-600" />
              </div>
              <input
                type="text"
                placeholder="Cari smartphone, aksesoris, atau merek..."
                className="w-full py-3 px-3 focus:outline-none"
              />
              <button className="bg-[#A91D92] text-white px-6 py-3 font-medium hover:bg-purple-700 transition-colors">
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12 pt-16">
        {/* Featured Categories */}
        <div className="mt-8 mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <span className="bg-[#A91D92] p-2 rounded-lg text-white mr-3">
              <FaTag />
            </span>
            KATEGORI POPULER
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['Smartphones', 'Wearables', 'Audio', 'Aksesoris', 'Chargers', 'Cases'].map((category, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-3 flex flex-col items-center cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-2">
                  <Image
                    src={`/category-${index + 1}.jpg`}
                    alt={category}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <span className="text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale */}
        <div className="mb-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Flame className="mr-2" /> FLASH SALE
          </h2>
          <div className="bg-white rounded-lg px-3 py-1 text-red-500 font-bold">
            {timerValue}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { name: "Smartphone X Pro", price: "1.999.000", original: "3.499.000" },
            { name: "TWS Earbuds Pro", price: "899.000", original: "1.499.000" },
            { name: "Smartwatch Series 7", price: "1.299.000", original: "2.199.000" },
            { name: "Bluetooth Speaker", price: "649.000", original: "1.099.000" },
            { name: "Ultrabook Slim", price: "8.999.000", original: "14.999.000" }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                  <img 
                    src={`/flash-${index + 1}.jpg`} 
                    alt={`Flash-${index+1}`}
                    className="object-contain max-h-full"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -40%
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-medium text-sm mb-1 truncate">{item.name}</h4>
                <div className="flex items-center">
                  <span className="text-red-500 font-bold">Rp{item.price}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="line-through">Rp{item.original}</span>
                  <div className="bg-red-100 text-red-500 rounded px-1 ml-2 text-xs">
                    Terlaris
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

        {/* VIVO Products Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-2xl font-bold text-blue-700 flex items-center">  
              VIVO
            </h3>
            <Link href="/customers/produk" className="text-blue-700 font-medium text-sm flex items-center">
              Lihat Semua
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          </div>

          {/* Category Pills */}
          <div className="px-5 pt-4 pb-2 flex space-x-2 text-sm overflow-x-auto scrollbar-hide">
            <span className="bg-blue-700 text-white px-3 py-1 rounded-full">Semua model</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">X Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">V Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">T Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">Y Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">S Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">Z Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-blue-700 rounded-full hover:text-white transition-colors cursor-pointer">Aksesoris</span>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5">
            {/* Product 1 */}
            <Link href="/products/v30/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/v30.png"
                    alt="Vivo V30"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">V30</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <p className="font-bold text-blue-700">Rp5.999.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-500 ml-1">(124)</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 2 */}
            <Link href="/products/watchgt/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/watchgt.png"
                    alt="Vivo Watch"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">Watch GT</h4>
                  <p className="text-xs text-gray-500 mb-1">Wearables</p>
                  <p className="font-bold text-blue-700">Rp2.499.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-black border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-500 ml-1">(86)</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 3 */}
            <Link href="/customers/transaksi/editpemesanan" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="relative bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/y28.png"
                    alt="Vivo y28"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    New
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">Y28</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <p className="font-bold text-blue-700">Rp3.199.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-[#A91D92] border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><span className="text-gray-300"><FaStar /></span>
                    <span className="text-gray-500 ml-1">(42)</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 4 */}
            <Link href="/products/y36/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/y29.png"
                    alt="Vivo Y36"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">Y36</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <p className="font-bold text-blue-700">Rp2.899.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-yellow-500 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><span className="text-gray-300"><FaStar /></span>
                    <span className="text-gray-500 ml-1">(57)</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 5 */}
            <Link href="/products/t2x/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/y18.png"
                    alt="Vivo T2x"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">T2x</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <p className="font-bold text-blue-700">Rp3.599.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-green-500 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-blue-300 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-black border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-500 ml-1">(98)</span>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 6 */}
            <Link href="/products/v29e/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="relative bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/v30e.png"
                    alt="Vivo V29e"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -15%
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">V29e</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <div className="flex items-center justify-center">
                    <p className="font-bold text-blue-700">Rp4.499.000</p>
                    <p className="text-xs line-through text-gray-500 ml-2">Rp5.299.000</p>
                  </div>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-red-600 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-800 border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><span className="text-gray-300"><FaStar /></span>
                    <span className="text-gray-500 ml-1">(76)</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Featured Promo Banner */}
        <div className="mb-10">
          <div className="bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-8">
                <h3 className="text-3xl font-bold text-white mb-4">Promo Spesial Bundling!</h3>
                <p className="text-blue-100 mb-6">Dapatkan smartphone baru dengan aksesoris premium dengan harga hemat. Penawaran terbatas!</p>
                <button className="bg-white text-purple-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition-colors">
                  Lihat Penawaran
                </button>
              </div>
              <div className="md:w-1/2 p-4 flex justify-center">
                <Image
                  src="/bundling.jpg"
                  alt="Bundling Promo"
                  width={300}
                  height={300}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* OPPO Products Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10">
          {/* Brand Header */}
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-2xl font-bold text-green-700 flex items-center">
              OPPO
            </h3>
            <Link href="/customers/produk" className="text-green-700 font-medium text-sm flex items-center">
              Lihat Semua
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </Link>
          </div>

          {/* Category Pills */}
          <div className="px-5 pt-4 pb-2 flex space-x-2 text-sm overflow-x-auto scrollbar-hide">
            <span className="bg-green-700 text-white px-3 py-1 rounded-full">Semua model</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-green-700 rounded-full hover:text-white transition-colors cursor-pointer">A Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-green-700 rounded-full hover:text-white transition-colors cursor-pointer">Reno Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-green-700 rounded-full hover:text-white transition-colors cursor-pointer">X Series</span>
            <span className="text-gray-600 px-3 py-1 hover:bg-green-700 rounded-full hover:text-white transition-colors cursor-pointer">Aksesoris</span>
          </div>

          {/* Products Grid - Similar structure to VIVO section but with OPPO products */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-5">
            {/* Similar product items as above but for OPPO */}
            {/* Just showing first product as example */}
            <Link href="/products/reno13/order" className="group">
              <div className="rounded-lg p-3 transition-all hover:shadow-md group-hover:scale-105">
                <div className="relative bg-gray-50 rounded-lg p-3 mb-3 flex items-center justify-center h-36">
                  <Image
                    src="/v30.png"
                    alt="OPPO Reno 13"
                    width={120}
                    height={150}
                    className="object-contain"
                  />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Hot
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="font-bold text-gray-800">Reno 13</h4>
                  <p className="text-xs text-gray-500 mb-1">Smartphones</p>
                  <p className="font-bold text-green-700">Rp6.499.000</p>
                  <div className="flex items-center justify-center mt-1 space-x-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 border border-gray-300"></span>
                    <span className="w-3 h-3 rounded-full bg-gray-300 border border-gray-300"></span>
                  </div>
                  <div className="flex items-center justify-center mt-2 text-xs text-yellow-500">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                    <span className="text-gray-500 ml-1">(103)</span>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* Add the remaining 5 OPPO products with similar structure */}
          </div>
        </div>

        {/* Newsletter & Updates Section */}
        <div className="bg-gray-900 text-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-3">
                  <FaBell className="mr-3 text-yellow-400" size={24} />
                  <h3 className="text-2xl font-bold">Dapatkan Update & Promo</h3>
                </div>
                <p className="text-gray-300 mb-4">Berlangganan newsletter kami untuk mendapatkan informasi terbaru tentang produk dan penawaran eksklusif.</p>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    placeholder="Alamat email Anda"
                    className="rounded-lg px-4 py-3 mb-2 sm:mb-0 sm:mr-2 text-gray-800 w-full sm:min-w-64"
                  />
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold px-6 py-3 rounded-lg transition-colors">
                    Berlangganan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full bg-white shadow-inner">
        <Footer />
      </footer>
    </div>
  );
}