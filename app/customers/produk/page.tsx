"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import Footer from "@/app/ui/footer";
import { useProducts } from '@/app/hooks/productHooks';
import { fetchProduk } from '@/app/produk';


export type produk = {
  id_produk: string;
  Nama_produk: string;
  Harga: Text; // Changed from Text to number
  stock: number;
  foto: string;
  deskripsi: string; // Changed from Text to string
}

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000000]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortBy, setSortBy] = useState("terbaru");
  
  // Menggunakan custom hook untuk data fetching
  const { products, loading, error } = useProducts();
  
  // State untuk menyimpan produk yang difilter
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Data kategori dan brand
  const brands = [
    { id: "semua", name: "Semua Brand", color: "gray" },
    { id: "vivo", name: "VIVO", color: "blue" },
    { id: "oppo", name: "OPPO", color: "green" },
    { id: "samsung", name: "Samsung", color: "indigo" },
    { id: "iphone", name: "iPhone", color: "gray" },
    { id: "xiaomi", name: "Xiaomi", color: "orange" }
  ];

  // Memfilter dan mengurutkan produk saat ada perubahan pada filter, pencarian, atau sortir
  useEffect(() => {
    if (!products) return;
    
    let result = [...products];
    
    // Filter berdasarkan brand
    if (activeFilter !== "semua") {
      result = result.filter(product => 
        product.brand.toLowerCase() === activeFilter.toLowerCase()
      );
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    // Filter berdasarkan rentang harga
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Pengurutan
    if (sortBy === "harga-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "harga-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "popular") {
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    } else {
      // Terbaru, asumsi produk sudah diurut berdasarkan tanggal di API
    }
    
    setFilteredProducts(result);
  }, [products, activeFilter, searchQuery, priceRange, sortBy]);

  // Handler untuk filter
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Handler untuk search
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handler untuk price range
  const handlePriceRangeChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = parseInt(e.target.value);
    setPriceRange(newRange);
  };

  // Reset filter
  const handleResetFilter = () => {
    setSearchQuery("");
    setPriceRange([0, 25000000]);
    setActiveFilter("semua");
    setSortBy("terbaru");
  };

  // Format harga ke Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  // Mengelompokkan produk berdasarkan brand
  const getProductsByBrand = (brandName) => {
    return filteredProducts.filter(product => 
      product.brand.toLowerCase() === brandName.toLowerCase()
    );
  };

  return (
    <div className="w-full min-h-screen bg-purple-50 py-9">
      {/* Header */}
      <div className="inset-0 bg-gradient-to-r from-purple-900/80 to-[#A91D92]/80 z-10 py-9 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Temukan Smartphone Impianmu</h1>
          <p className="text-white max-w-2xl">
            Koleksi lengkap smartphone terbaru dari berbagai merek terpercaya dengan harga terbaik dan garansi resmi
          </p>
        </div>
      </div>
      

      {/* Search and Filter Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-grow">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="pl-3">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Cari smartphone, aksesoris, atau merek..."
                  className="w-full py-3 px-3 focus:outline-none"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button className="bg-[#A91D92] text-white px-6 py-3 font-medium hover:bg-purple-700 transition-colors">
                  Cari
                </button>
              </div>
            </div>

            {/* Filter and Sort Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FaFilter /> Filter
              </button>
              
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 pr-10 transition-colors cursor-pointer"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="harga-asc">Harga: Rendah ke Tinggi</option>
                  <option value="harga-desc">Harga: Tinggi ke Rendah</option>
                  <option value="popular">Popularitas</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <FaSort />
                </div>
              </div>
            </div>
          </div>

          {/* Filter Menu */}
          {showFilterMenu && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Brand</h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => {
                      // Define specific hover classes based on brand color
                      const buttonClasses = {
                        blue: activeFilter === brand.id 
                          ? "bg-blue-600 text-white" 
                          : "text-gray-600 border border-gray-300 hover:bg-blue-600 hover:text-white",
                        green: activeFilter === brand.id 
                          ? "bg-green-600 text-white" 
                          : "text-gray-600 border border-gray-300 hover:bg-green-600 hover:text-white",
                        indigo: activeFilter === brand.id 
                          ? "bg-indigo-600 text-white" 
                          : "text-gray-600 border border-gray-300 hover:bg-indigo-600 hover:text-white",
                        gray: activeFilter === brand.id 
                          ? "bg-gray-700 text-white" 
                          : "text-gray-600 border border-gray-300 hover:bg-gray-700 hover:text-white",
                        orange: activeFilter === brand.id 
                          ? "bg-orange-600 text-white" 
                          : "text-gray-600 border border-gray-300 hover:bg-orange-600 hover:text-white",
                      };

                      return (
                        <button
                          key={brand.id}
                          onClick={() => handleFilterChange(brand.id)}
                          className={`px-3 py-1.5 rounded-full ${buttonClasses[brand.color] || 'text-gray-600 border border-gray-300'}`}
                        >
                          {brand.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Rentang Harga</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                    <div className="flex gap-4">
                      <input
                        type="range"
                        min="0"
                        max="25000000"
                        step="500000"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(e, 0)}
                        className="w-full"
                      />
                      <input
                        type="range"
                        min="0" 
                        max="25000000"
                        step="500000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Kategori</h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Smartphones</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Tablets</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Wearables</span> 
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="w-4 h-4" defaultChecked />
                      <span>Aksesoris</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex justify-end mt-6 gap-3">
                <button 
                  onClick={handleResetFilter}
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={() => setShowFilterMenu(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}

          {/* Brand Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2 pt-4 hide-scrollbar">
            {brands.map((brand) => {
              const baseClass = "px-4 py-2 rounded-full whitespace-nowrap transition-colors";
              let brandClass;
              
              if (activeFilter === brand.id) {
                if (brand.color === "blue") brandClass = "bg-blue-600 text-white";
                else if (brand.color === "green") brandClass = "bg-green-600 text-white";
                else if (brand.color === "indigo") brandClass = "bg-indigo-600 text-white";
                else if (brand.color === "gray") brandClass = "bg-gray-700 text-white";
                else if (brand.color === "orange") brandClass = "bg-orange-600 text-white";
                else brandClass = "bg-gray-600 text-white";
              } else {
                brandClass = "bg-gray-100 text-gray-700 hover:bg-gray-200";
              }
              
              return (
                <button
                  key={brand.id}
                  onClick={() => handleFilterChange(brand.id)}
                  className={`${baseClass} ${brandClass}`}
                >
                  {brand.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">Gagal memuat data produk.</span>
          </div>
        )}
        
        {/* No products found */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">Tidak ada produk ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}
        
        {/* Products by brand sections */}
        {!loading && !error && brands.slice(1).map(brand => {
          const brandProducts = activeFilter === "semua" ? 
            getProductsByBrand(brand.id) : 
            (activeFilter === brand.id ? filteredProducts : []);
            
          if (brandProducts.length === 0 && activeFilter !== "semua" && activeFilter !== brand.id) {
            return null;
          }
          
          let brandTextColor;
          if (brand.color === "blue") brandTextColor = "text-blue-700";
          else if (brand.color === "green") brandTextColor = "text-green-700";
          else if (brand.color === "indigo") brandTextColor = "text-indigo-700";
          else if (brand.color === "gray") brandTextColor = "text-gray-700";
          else if (brand.color === "orange") brandTextColor = "text-orange-600";
          else brandTextColor = "text-gray-700";
          
          return (
            <section key={brand.id} className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-2xl font-bold ${brandTextColor}`}>{brand.name}</h2>
                <Link href={`/brand/${brand.id}`} className={`${brandTextColor} hover:underline text-sm font-medium`}>
                  Lihat Semua
                </Link>
              </div>

              {/* Produk Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Produk.map(fetchProduk => (
                  <ProductCard 
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.image}
                    category={product.category}
                    price={product.price}
                    colors={product.colors}
                    isFeatured={product.isFeatured}
                  />
                ))}
              </div>
            </section>
          );
        })}
        
        {/* When a specific brand is selected, display all products from that brand */}
        {activeFilter !== "semua" && filteredProducts.length > 0 && (
          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  image={product.image}
                  category={product.category}
                  price={product.price}
                  colors={product.colors}
                  isFeatured={product.isFeatured}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white">
        <Footer />
      </footer>
    </div>
  );
}

// Product Card Component
function ProductCard({ id, name, image, category, price, colors, isFeatured = false }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className={`group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${isFeatured ? 'border-2 border-purple-400' : 'border border-gray-200'}`}>
      {isFeatured && (
        <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs px-2 py-1 rounded-full z-10">
          Featured
        </div>
      )}
      <Link href={`/product/${id}`}>
        <div className="pt-6 px-4 flex items-center justify-center h-48">
          <Image
            src={image || "/placeholder.png"}
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
                <span key={index} className={`w-3 h-3 rounded-full ${color}`}></span>
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