'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaMinus, FaPlus, FaStar, FaShippingFast, FaCheck } from 'react-icons/fa';
import { Tab } from '@headlessui/react';

export default function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {

  const router = useRouter();

  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState('BLACK');
  const [storage, setStorage] = useState('8/128');
  const [activeTab, setActiveTab] = useState(0);
  
  // Product information
  const product = {
    id: 'y28888',
    name: 'VIVO Y28',
    price: 2499000,
    rating: '5.0',
    reviews: '3,2 RB Penilaian',
    sold: '10+ RB SOLD',
    images: ['/y28.png', '/y28black.jpg'],
    colors: ['BLACK', 'PINK'],
    storage: ['8/128', '8/256'],
    description: 'VIVO Y28 hadir dengan desain modern dan performa handal untuk pengalaman mobile gaming dan produktivitas sehari-hari. Dilengkapi dengan baterai 5000mAh dan teknologi fast charging 44W untuk penggunaan sepanjang hari.',
    highlights: [
      'Layar 6.56" FHD+ 90Hz Ultra Smooth',
      'Kamera 50MP AI dengan fitur Night Mode',
      'Qualcomm Snapdragon 695 5G',
      'Baterai 5000mAh dengan Fast Charge 44W',
      'RAM 8GB + RAM Extended hingga 8GB',
      'Storage 128GB/256GB (Expandable)',
      'FunTouch OS 13 berbasis Android 13',
      'IP54 Tahan Air dan Debu'
    ],
    specifications: {
      processor: 'Qualcomm Snapdragon 695 5G',
      display: '6.56" FHD+ (2408×1080) 90Hz',
      camera: {
        main: '50MP (f/1.8) + 2MP (f/2.4) + 2MP (f/2.4)',
        front: '16MP (f/2.0)'
      },
      battery: '5000mAh dengan 44W Fast Charging',
      os: 'FunTouch OS 13 berbasis Android 13',
      connectivity: 'Dual SIM, 5G, WiFi 802.11 a/b/g/n/ac, Bluetooth 5.1',
      dimensions: '164.05 × 75.60 × 8.39 mm',
      weight: '190g'
    },
    warranty: '12 bulan garansi resmi VIVO Indonesia'
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const cartItem = {
      id: product.id,
      name: product.name,
      color: color,
      storage: storage,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      selected: true
    };
    
    existingCart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(existingCart));
    router.push('/customers/transaksi/cart');
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/customers/transaksi/checkout');
  };

  const formatPrice = (price: number | string) => {
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('id-ID').format(numericPrice);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      {/* Back Button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-gray-600 mb-4 hover:text-purple-600"
      >
        <FaArrowLeft className="mr-2" /> Kembali
      </button>

      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Product Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Product Image Gallery */}
          <div className="space-y-4">
            <div className="flex justify-center items-center bg-gray-100 rounded-lg p-6 h-80">
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                width={300} 
                height={400} 
                className="object-contain h-full"
              />
            </div>
            <div className="flex space-x-2 justify-center">
              {product.images.map((img, index) => (
                <div key={index} className="w-20 h-20 border-2 border-gray-200 rounded-md p-1 cursor-pointer hover:border-purple-600">
                  <Image 
                    src={img} 
                    alt={`${product.name} view ${index}`} 
                    width={80} 
                    height={80} 
                    className="object-contain w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Ratings */}
            <div className="flex items-center mb-4">
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating}</span>
              <span className="mx-2 text-sm text-gray-600">|</span>
              <span className="text-sm text-gray-600">{product.reviews}</span>
              <span className="mx-2 text-sm text-gray-600">|</span>
              <span className="text-sm text-gray-600">{product.sold}</span>
            </div>
            
            {/* Price */}
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Rp {formatPrice(product.price)}</h2>
            
            {/* Short Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Free Shipping Badge */}
            <div className="flex items-center mb-6 bg-blue-50 text-blue-700 p-2 rounded-md w-fit">
              <FaShippingFast className="mr-2" />
              <span>Gratis Ongkir</span>
            </div>

            {/* Color selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Warna</h3>
              <div className="flex space-x-4">
                {product.colors.map((colorOption) => (
                  <button
                    key={colorOption}
                    className={`px-4 py-2 border rounded-md ${
                      color === colorOption ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}
                    onClick={() => setColor(colorOption)}
                  >
                    {colorOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Storage selection */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">RAM/Storage</h3>
              <div className="flex space-x-4">
                {product.storage.map((storageOption) => (
                  <button
                    key={storageOption}
                    className={`px-4 py-2 border rounded-md ${
                      storage === storageOption ? 'border-purple-600 bg-purple-50' : 'border-gray-300'
                    }`}
                    onClick={() => setStorage(storageOption)}
                  >
                    {storageOption} GB
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">Kuantitas</h3>
              <div className="flex items-center">
                <button
                  className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-md"
                  onClick={handleDecreaseQuantity}
                >
                  <FaMinus size={12} />
                </button>
                <span className="mx-4 text-xl font-semibold">{quantity}</span>
                <button
                  className="bg-purple-600 text-white w-8 h-8 flex items-center justify-center rounded-md"
                  onClick={handleIncreaseQuantity}
                >
                  <FaPlus size={12} />
                </button>
                <span className="ml-4 text-sm text-gray-600">Tersisa 121 buah</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4 mb-6">
              <button
                className="flex-1 bg-white border border-purple-600 text-purple-600 py-3 rounded-md font-semibold hover:bg-purple-50"
                onClick={handleAddToCart}
              >
                Masukkan Keranjang
              </button>
              <button
                className="flex-1 bg-purple-600 text-white py-3 rounded-md font-semibold hover:bg-purple-700"
                onClick={handleBuyNow}
              >
                Beli Sekarang
              </button>
            </div>

            {/* Warranty */}
            <div className="flex items-center text-gray-600">
              <FaCheck className="text-green-500 mr-2" />
              <span>{product.warranty}</span>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tab.Group>
            <Tab.List className="flex space-x-1 border-b border-gray-200">
              <Tab 
                className={({ selected }) =>
                  `px-4 py-2 font-medium text-sm focus:outline-none ${
                    selected 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Deskripsi
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `px-4 py-2 font-medium text-sm focus:outline-none ${
                    selected 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Spesifikasi
              </Tab>
              <Tab 
                className={({ selected }) =>
                  `px-4 py-2 font-medium text-sm focus:outline-none ${
                    selected 
                      ? 'text-purple-600 border-b-2 border-purple-600' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`
                }
              >
                Ulasan
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-6">
              {/* Description Tab */}
              <Tab.Panel>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Tentang Produk</h3>
                  <p className="text-gray-600">{product.description}</p>
                  
                  <h3 className="text-xl font-semibold">Highlights</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {product.highlights.map((highlight, index) => (
                      <li key={index} className="text-gray-600">{highlight}</li>
                    ))}
                  </ul>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-700 mb-2">Fitur Unggulan</h3>
                    <p className="text-gray-700">
                      VIVO Y28 merupakan ponsel pintar terbaru dari VIVO yang dirancang khusus untuk menjawab kebutuhan 
                      generasi muda dengan teknologi kamera terdepan dan performa maksimal. Dengan kombinasi RAM 8GB dan 
                      teknologi Extended RAM, bermain game dan multitasking menjadi lebih lancar tanpa hambatan. 
                    </p>
                    <p className="text-gray-700 mt-2">
                      Nikmati pengalaman visual memukau dengan layar 6.56" FHD+ yang didukung refresh rate 90Hz untuk 
                      scrolling yang mulus dan tampilan yang tajam. Baterai 5000mAh dengan 44W Fast Charging memastikan 
                      perangkat Anda bertahan sepanjang hari dan dapat diisi ulang dengan cepat.
                    </p>
                  </div>
                </div>
              </Tab.Panel>
              
              {/* Specifications Tab */}
              <Tab.Panel>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Spesifikasi Teknis</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">Prosesor</h4>
                        <p className="text-gray-600">{product.specifications.processor}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Layar</h4>
                        <p className="text-gray-600">{product.specifications.display}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Kamera</h4>
                        <p className="text-gray-600">Belakang: {product.specifications.camera.main}</p>
                        <p className="text-gray-600">Depan: {product.specifications.camera.front}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Baterai</h4>
                        <p className="text-gray-600">{product.specifications.battery}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800">Sistem Operasi</h4>
                        <p className="text-gray-600">{product.specifications.os}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Konektivitas</h4>
                        <p className="text-gray-600">{product.specifications.connectivity}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Dimensi</h4>
                        <p className="text-gray-600">{product.specifications.dimensions}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-gray-800">Berat</h4>
                        <p className="text-gray-600">{product.specifications.weight}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg mt-6">
                    <h4 className="font-semibold text-gray-800">Kelengkapan Paket</h4>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li className="text-gray-600">1 Unit VIVO Y28</li>
                      <li className="text-gray-600">Adaptor Fast Charging 44W</li>
                      <li className="text-gray-600">Kabel USB Type-C</li>
                      <li className="text-gray-600">Headset</li>
                      <li className="text-gray-600">Kartu Garansi</li>
                      <li className="text-gray-600">SIM Ejector Tool</li>
                      <li className="text-gray-600">Panduan Pengguna</li>
                      <li className="text-gray-600">Softcase Transparan</li>
                    </ul>
                  </div>
                </div>
              </Tab.Panel>
              
              {/* Reviews Tab */}
              <Tab.Panel>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Ulasan Pembeli</h3>
                    <div className="flex items-center">
                      <span className="text-xl font-bold text-yellow-500">{product.rating}</span>
                      <div className="flex text-yellow-400 ml-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                    </div>
                  </div>
                  
                  {/* Sample Reviews */}
                  {[
                    {
                      name: 'Ahmad S.',
                      rating: 5,
                      date: '15 Mar 2025',
                      comment: 'Kamera bagus, baterai tahan lama, dan performa sangat memuaskan untuk harga segini. Game berat juga lancar. Pengiriman cepat dan sesuai dengan deskripsi.',
                      helpful: 124
                    },
                    {
                      name: 'Sinta W.',
                      rating: 5,
                      date: '10 Mar 2025',
                      comment: 'HP nya keren banget, apalagi warna pink! Buat foto-foto juga bagus hasilnya, RAM 8GB bikin multitasking lancar, recommended banget deh!',
                      helpful: 89
                    },
                    {
                      name: 'Deni P.',
                      rating: 4,
                      date: '28 Feb 2025',
                      comment: 'Overall bagus, tapi agak berat di tangan. Fast charging nya kenceng banget, 30 menit udah 60%. Worth it dengan harganya.',
                      helpful: 56
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-semibold">{review.name}</h4>
                          <div className="flex items-center">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <FaStar key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} size={14} />
                              ))}
                            </div>
                            <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{review.comment}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <button className="flex items-center hover:text-purple-600">
                          <FaCheck className="mr-1" /> Helpful ({review.helpful})
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-50">
                    Lihat Semua Ulasan
                  </button>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
}