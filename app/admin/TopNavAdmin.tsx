'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function TopNav() {
  const pathname = usePathname(); // Dapatkan URL halaman saat ini

  // Fungsi untuk menentukan apakah link aktif
  const isActive = (href: string) => {
    // Bandingkan href dengan pathname
    // Gunakan startsWith untuk menangani kasus seperti /admin/DaftarTransaksi/[id]/edit
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900 to-[#A91D92] text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/LOGOPIXELL.png"
                alt="Pixell Logo"
                width={140}
                height={60}
                className="h-10 w-auto hover:scale-105 transition-transform duration-200"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link
                href="/admin/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/admin/dashboard') ? 'bg-purple-800' : 'hover:bg-purple-800'
                }`}
              >
                Beranda
              </Link>
              <Link
                href="/admin/DaftarTransaksi"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/admin/DaftarTransaksi') ? 'bg-purple-800' : 'hover:bg-purple-800'
                }`}
              >
                Daftar Transaksi
              </Link>
              <Link
                href="/admin/DaftarProduk"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                  isActive('/admin/DaftarProduk') ? 'bg-purple-800' : 'hover:bg-purple-800'
                }`}
              >
                Daftar Produk
              </Link>
            </div>
          </div>

          {/* Right Side (Account/Cart) */}
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/akunadmin"
              className={`p-2 rounded-full transition-colors duration-300 ${
                isActive('/admin/akunadmin') ? 'bg-purple-800' : 'hover:bg-purple-800'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile menu button (hidden on desktop) */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-800 focus:outline-none transition duration-150 ease-in-out"
              aria-label="Main menu"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className="md:hidden hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-purple-900">
          <Link
            href="/admin/Beranda"
            className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
              isActive('/admin/Beranda') ? 'bg-purple-800' : 'hover:bg-purple-800'
            }`}
          >
            Home
          </Link>
          <Link
            href="/admin/DaftarTransaksi"
            className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
              isActive('/admin/DaftarTransaksi') ? 'bg-purple-800' : 'hover:bg-purple-800'
            }`}
          >
            Transaction
          </Link>
          <Link
            href="/admin/DaftarProduk"
            className={`block px-3 py-2 rounded-md text-base font-medium text-white ${
              isActive('/admin/DaftarProduk') ? 'bg-purple-800' : 'hover:bg-purple-800'
            }`}
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
}