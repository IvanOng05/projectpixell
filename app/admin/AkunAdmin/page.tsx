'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from "@/app/ui/footer";

export default function AdminAccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [admin, setAdmin] = useState({
    name: 'Admin NEXT45',
    email: 'admin@next45.com',
    phone: '08123456789',
    role: 'Super Admin',
    password: 'admin123',
    photo: '/admin-avatar.png',
    lastLogin: '23 April 2025, 10:30 WIB',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
    }
    setIsEditing(!isEditing);
  };

  const handleSignOut = () => {

    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header Navigation */}
      <nav className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold">PIXELL PHONE</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-purple-200 transition">Beranda</a>
              <a href="#" className="hover:text-purple-200 transition">Daftar Transaksi</a>
              <a href="#" className="hover:text-purple-200 transition">Daftar Produk</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex-1">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
          {/* Header dengan background accent */}
          <div className="bg-gradient-to-r from-[#1D44A9] to-[#3B66D3] p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Admin Dashboard</h1>
                <p className="opacity-80 mt-1 text-sm">Kelola informasi admin dan akses sistem</p>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium text-sm transition-all focus:outline-none focus:ring-2 focus:ring-white/50 whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>

          {/* Profile section */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col lg:flex-row items-center lg:items-start gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/FOTOORANG.png"
                  alt="Foto Admin"
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                />
              </div>
              {isEditing && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
                  <span className="text-white text-xs font-medium">Ubah Foto</span>
                </div>
              )}
            </div>

            <div className="text-center lg:text-left flex-1">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{admin.name}</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">{admin.role}</span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{admin.email}</p>
              <p className="text-gray-400 text-xs mb-2">Login terakhir: {admin.lastLogin}</p>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-center lg:justify-start">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isEditing 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500" 
                      : "bg-[#1D44A9] hover:bg-[#16367e] text-white focus:ring-[#1D44A9]"
                  }`}
                  onClick={handleEditToggle}
                >
                  {isEditing ? 'Simpan Perubahan' : 'Edit Profil'}
                </button>
                {isEditing && (
                  <button
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    onClick={() => setIsEditing(false)}
                  >
                    Batal
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Form fields */}
          <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Admin</label>
              <input
                type="text"
                name="name"
                value={admin.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D44A9] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={admin.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D44A9] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                value={admin.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D44A9] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={admin.password}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D44A9] focus:border-transparent transition ${
                    !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                  }`}
                />
                {isEditing && (
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Peran Admin</label>
              <select
                name="role"
                value={admin.role}
                onChange={(e) => setAdmin((prev) => ({ ...prev, role: e.target.value }))}
                disabled={!isEditing}
                className={`w-full lg:w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#1D44A9] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
                <option value="Moderator">Moderator</option>
              </select>
            </div>
          </div>

          {/* Admin control section */}
          <div className="p-4 sm:p-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Fitur Admin</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <button className="p-3 bg-blue-50 hover:bg-blue-100 text-blue-800 rounded-lg font-medium text-sm flex flex-col items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Kelola Pengguna
              </button>
              <button className="p-3 bg-green-50 hover:bg-green-100 text-green-800 rounded-lg font-medium text-sm flex flex-col items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Laporan Transaksi
              </button>
              <button className="p-3 bg-yellow-50 hover:bg-yellow-100 text-yellow-800 rounded-lg font-medium text-sm flex flex-col items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                </svg>
                Kelola Produk
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Aktivitas Terbaru</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    <div>
                      <p className="text-xs text-gray-700">Login terakhir dari 36.77.120.45</p>
                      <p className="text-xs text-gray-500">23 April 2025, 10:30 WIB</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-1 w-2 h-2 bg-green-500 rounded-full"></span>
                    <div>
                      <p className="text-xs text-gray-700">Menambahkan produk baru</p>
                      <p className="text-xs text-gray-500">22 April 2025, 14:22 WIB</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 mt-1 w-2 h-2 bg-purple-500 rounded-full"></span>
                    <div>
                      <p className="text-xs text-gray-700">Mengupdate status pesanan #45982</p>
                      <p className="text-xs text-gray-500">22 April 2025, 09:15 WIB</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Statistik Sistem</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Pengguna Aktif</span>
                      <span className="text-xs font-medium text-blue-600">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Kapasitas Server</span>
                      <span className="text-xs font-medium text-green-600">42%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-green-600 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs text-gray-600">Tingkat Transaksi</span>
                      <span className="text-xs font-medium text-yellow-600">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="bg-yellow-600 h-1.5 rounded-full" style={{ width: '67%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security and logs section */}
          <div className="p-4 sm:p-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Keamanan dan Pengaturan</h3>
            <div className="flex flex-col md:flex-row gap-2">
              <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Ganti Password
              </button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Log Aktivitas
              </button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pengaturan Sistem
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}