'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Footer from "@/app/ui/footer";

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: 'Pelanggan',
    email: 'nama@email.com',
    phone: '08123456789',
    address: 'Jl. Contoh Alamat No. 123',
    password: 'password123',
    photo: '/FOTOORANG.png',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Logic untuk save perubahan bisa ditambahkan di sini
    }
    setIsEditing(!isEditing);
  };

  const handleSignOut = () => {

    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 flex-1">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
          {/* Header dengan background accent */}
          <div className="bg-gradient-to-r from-[#A91D92] to-[#d33bbc] p-4 sm:p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">Akun Saya</h1>
            <p className="opacity-80 mt-1 text-sm">Kelola informasi pribadi Anda</p>
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
          

          {/* Profile section */}
          <div className="p-4 sm:p-6 flex-1 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative group flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={user.photo}
                  alt="Foto Profil"
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

            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{user.email}</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isEditing 
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white focus:ring-emerald-500" 
                      : "bg-[#A91D92] hover:bg-[#8a1677] text-white focus:ring-[#A91D92]"
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
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#A91D92] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#A91D92] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
              <input
                type="tel"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#A91D92] focus:border-transparent transition ${
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
                  value={user.password}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#A91D92] focus:border-transparent transition ${
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <textarea
                name="address"
                value={user.address}
                onChange={handleChange}
                readOnly={!isEditing}
                rows={2}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-[#A91D92] focus:border-transparent transition ${
                  !isEditing ? 'bg-gray-50 text-gray-800' : 'bg-white'
                }`}
              />
            </div>
          </div>

          {/* Security and preferences section */}
          <div className="p-4 sm:p-6 border-t">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pengaturan dan Preferensi</h3>
            <div className="flex flex-col md:flex-row gap-2">
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Ganti Password
              </button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Notifikasi
              </button>
              <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium text-xs flex items-center transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Privasi
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