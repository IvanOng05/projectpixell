"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import Footer from "@/app/ui/footer";
import { useProducts } from '@/app/hooks/productHooks';
import ProductCard from '@/app/ui/customers/ProductCard';



const ITEMS_PER_PAGE = 8;

// Utility function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function Pagination({ 
  totalPages, 
  currentPage, 
  onPageChange 
}: { 
  totalPages: number; 
  currentPage: number; 
  onPageChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;
    
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(showPages / 2));
      const end = Math.min(totalPages, start + showPages - 1);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage <= 1}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`px-3 py-2 rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-purple-600 text-white'
              : page === '...'
              ? 'cursor-default text-gray-400'
              : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
          }`}
          aria-label={typeof page === 'number' ? `Page ${page}` : undefined}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}


export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get URL parameters
  const activeFilter = searchParams.get('filter') || "semua";
  const searchQuery = searchParams.get('query') || "";
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sort') || "terbaru";
  const selectedCategoriesParam = searchParams.get('categories');
  const priceMinParam = searchParams.get('price_min');
  const priceMaxParam = searchParams.get('price_max');
  
  // Local state
  const [priceRange, setPriceRange] = useState<number[]>([
    priceMinParam ? parseInt(priceMinParam) : 0,
    priceMaxParam ? parseInt(priceMaxParam) : 25000000
  ]);
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    selectedCategoriesParam ? selectedCategoriesParam.split(',') : []
  );

  const { products, loading, error } = useProducts();

  // Debug product URLs
  useEffect(() => {
    if (products) {
      products.forEach(product => {
        if (!product.foto || !isValidUrl(product.foto)) {
          console.warn(`Invalid foto URL for product ${product.nama_produk}: ${product.foto}`);
        }
      });
    }
  }, [products]);

  const brands = useMemo(() => [
    { id: "semua", name: "Semua Brand", color: "gray" },
    { id: "vivo", name: "VIVO", color: "blue" },
    { id: "oppo", name: "OPPO", color: "green" },
    { id: "samsung", name: "Samsung", color: "indigo" },
    { id: "iphone", name: "iPhone", color: "gray" },
    { id: "xiaomi", name: "Xiaomi", color: "orange" }
  ], []);

  // Update URL with new parameters
  const updateURL = (params: Record<string, string | number | null>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    
    Object.entries(params).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'semua' || 
          (key === 'page' && value === 1) ||
          (key === 'sort' && value === 'terbaru')) {
        newSearchParams.delete(key);
      } else {
        newSearchParams.set(key, value.toString());
      }
    });

    router.push(`?${newSearchParams.toString()}`, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Filter by brand
    if (activeFilter !== "semua") {
      result = result.filter(product =>
        product.nama_produk.toLowerCase().includes(activeFilter.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.nama_produk.toLowerCase().includes(query) ||
        product.kategori.toLowerCase().includes(query) ||
        product.deskripsi.toLowerCase().includes(query)
      );
    }

    // Filter by price range
    result = result.filter(product =>
      product.harga >= priceRange[0] && product.harga <= priceRange[1]
    );

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter(product =>
        selectedCategories.includes(product.kategori.toLowerCase())
      );
    }

    // Sort products
    return result.sort((a, b) => {
      if (sortBy === "harga-asc") return a.harga - b.harga;
      if (sortBy === "harga-desc") return b.harga - a.harga;
      if (sortBy === "popular") return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [products, activeFilter, searchQuery, priceRange, sortBy, selectedCategories]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleFilterChange = (filter: string) => {
    updateURL({ filter, page: 1 });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get('search') as string;
    updateURL({ query, page: 1 });
  };

  const handleSortChange = (sort: string) => {
    updateURL({ sort, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value) || 0;
    const newRange = [...priceRange];
    newRange[index] = value;
    // Ensure min <= max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    setPriceRange(newRange);
  };

  const handleApplyFilters = () => {
    updateURL({
      price_min: priceRange[0] > 0 ? priceRange[0] : null,
      price_max: priceRange[1] < 25000000 ? priceRange[1] : null,
      categories: selectedCategories.length > 0 ? selectedCategories.join(',') : null,
      page: 1
    });
    setShowFilterMenu(false);
  };

  const handleResetFilter = () => {
    setPriceRange([0, 25000000]);
    setSelectedCategories([]);
    updateURL({
      filter: null,
      query: null,
      sort: null,
      price_min: null,
      price_max: null,
      categories: null,
      page: null
    });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category.toLowerCase()]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-full min-h-screen bg-purple-50 py-9">
      <div className="inset-0 bg-gradient-to-r from-purple-900/80 to-[#A91D92]/80 z-10 py-9 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Temukan Smartphone Impianmu</h1>
          <p className="text-white max-w-2xl">
            Koleksi lengkap smartphone terbaru dari berbagai merek terpercaya dengan harga terbaik dan garansi resmi
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-10 bg-white shadow-md py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-grow">
              <form onSubmit={handleSearchSubmit} className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <div className="pl-3"><FaSearch className="text-gray-400" /></div>
                <input
                  name="search"
                  type="text"
                  placeholder="Cari smartphone, aksesoris, atau merek..."
                  className="w-full py-3 px-3 focus:outline-none"
                  defaultValue={searchQuery}
                />
                <button 
                  type="submit"
                  className="bg-[#A91D92] text-white px-6 py-3 font-medium hover:bg-purple-700 transition-colors"
                >
                  Cari
                </button>
              </form>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilterMenu(!showFilterMenu)} 
                className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                aria-expanded={showFilterMenu}
                aria-controls="filter-menu"
              >
                <FaFilter /> Filter
              </button>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 pr-10 transition-colors cursor-pointer"
                  aria-label="Sort options"
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

          {showFilterMenu && (
            <div id="filter-menu" className="mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Brand</h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand.id}
                        onClick={() => handleFilterChange(brand.id)}
                        className={`px-3 py-1.5 rounded-full ${activeFilter === brand.id
                          ? `${brand.color === 'blue' ? 'bg-blue-600' : brand.color === 'green' ? 'bg-green-600' : brand.color === 'indigo' ? 'bg-indigo-600' : brand.color === 'gray' ? 'bg-gray-700' : brand.color === 'orange' ? 'bg-orange-600' : 'bg-gray-600'} text-white`
                          : 'text-gray-600 border border-gray-300 hover:bg-gray-200'}`}
                        aria-pressed={activeFilter === brand.id}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>

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
                        aria-label="Minimum price"
                      />
                      <input
                        type="range"
                        min="0"
                        max="25000000"
                        step="500000"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(e, 1)}
                        className="w-full"
                        aria-label="Maximum price"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-3">Kategori</h3>
                  <div className="space-y-2">
                    {['smartphones', 'tablets', 'wearables', 'aksesoris'].map(category => (
                      <label key={category} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          aria-label={`Filter by ${category}`}
                        />
                        <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <button 
                  onClick={handleResetFilter} 
                  className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={handleApplyFilters} 
                  className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          )}

          <div className="flex space-x-2 overflow-x-auto pb-2 pt-4 hide-scrollbar">
            {brands.map((brand) => (
              <button
                key={brand.id}
                onClick={() => handleFilterChange(brand.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${activeFilter === brand.id
                  ? `${brand.color === 'blue' ? 'bg-blue-600' : brand.color === 'green' ? 'bg-green-600' : brand.color === 'indigo' ? 'bg-indigo-600' : brand.color === 'gray' ? 'bg-gray-700' : brand.color === 'orange' ? 'bg-orange-600' : 'bg-gray-600'} text-white`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                aria-pressed={activeFilter === brand.id}
              >
                {brand.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" aria-label="Loading products"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error! </strong>
            <span className="block sm:inline">Gagal memuat data produk.</span>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-700">Tidak ada produk ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba ubah filter atau kata kunci pencarian Anda</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Menampilkan {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)} dari {filteredProducts.length} produk
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map(product => (
                <ProductCard
                  key={product.id_produk}
                  id_produk={product.id_produk}
                  nama_produk={product.nama_produk}
                  foto={product.foto}
                  kategori={product.kategori}
                  harga={product.harga}
                  colors={[]}
                  isFeatured={product.isFeatured || false}
                />
              ))}
            </div>

            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      <footer className="w-full bg-white">
        <Footer />
      </footer>
    </div>
  );
}