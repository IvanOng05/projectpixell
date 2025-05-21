import Link from 'next/link';
import Image from 'next/image';

export default function TopNav() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-purple-900 to-[#A91D92] text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
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
                href="/dashboard/customers"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Beranda
              </Link>
              <Link
                href="/dashboard/customers/produk"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Produk
              </Link>
              <Link
                href="/dashboard/customers/tentangkami"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Tentang Kami
              </Link>
              <Link
                href="/dashboard/customers/kontak"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Kontak
              </Link>
            </div>
          </div>

          {/* Right Side (Account/Cart) */}
          <div className="flex items-center space-x-4">
            <Link
              href="/dashboard/customers/transaksi/cart"
              className="p-2 rounded-full hover:bg-purple-800 transition-colors duration-300 relative"
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-xs text-purple-900 font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>
            
            <Link
              href="/dashboard/customers/akun"
              className="p-2 rounded-full hover:bg-purple-800 transition-colors duration-300"
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
                href="/dashboard/customers"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Beranda
              </Link>
              <Link
                href="/dashboard/customers/produk"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Produk
              </Link>
              <Link
                href="/dashboard/customers/tentangkami"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Tentang Kami
              </Link>
              <Link
                href="/dashboard/customers/kontak"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-800 transition-colors duration-300"
              >
                Kontak
              </Link>
        </div>
      </div>
    </nav>
  );
}