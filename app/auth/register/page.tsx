'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

type RegisterFormData = {
  username: string;
  password: string;
  namaLengkap: string;
  email: string;
  alamat: string;
  nomorTelepon: string;
};

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();

  useEffect(() => {
    reset();
  }, [reset]);

  const onSubmit = (data: RegisterFormData) => {
    toast.success('Register Berhasil!', { theme: 'dark' });
    console.log('Registration data:', data);
    router.push('/auth/login');
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel with Logo */}
      <div className="hidden md:flex w-1/3 bg-[#A91D92] flex-col items-center justify-center p-8">
        <div className="text-center">
          <div className="mb-4">
          <Link href="/">
            <Image
              src="/fotologohp.png" 
              alt="Pixell Logo"
              width={230}
              height={50}
              className="object-contain"
            />
          </Link>
  
          </div>
          <Link href="/">
            <Image
              src="/LOGOPIXELL.png" 
              alt="Pixell Logo"
              width={230}
              height={50}
              className="object-contain"
            />
          </Link>
        </div>
      </div>

      {/* Right Panel with Form */}
      <div className="w-full md:w-2/3 bg-black bg-opacity-90 flex flex-col items-center justify-center p-6" 
           style={{ backgroundImage: 'url(/bg-hitam.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="w-full max-w-md bg-transparent p-6">
          <h1 className="text-4xl text-white font-bold text-center mb-8">Register</h1>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                {...register('username', {
                  required: 'Username tidak boleh kosong',
                  minLength: { value: 3, message: 'Username minimal 3 karakter' }
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Username"
              />
            </div>
            {errors.username && <p className="text-red-400 text-sm">{errors.username.message}</p>}

            {/* Password field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                {...register('password', {
                  required: 'Password tidak boleh kosong',
                  minLength: { value: 6, message: 'Password minimal 6 karakter' }
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2"
              >
                {showPassword ? 
                  <FaEyeSlash size={20} className="text-gray-500 cursor-pointer" /> : 
                  <FaEye size={20} className="text-gray-500 cursor-pointer" />
                }
              </button>
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}

            {/* Nama Lengkap field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              <input
                {...register('namaLengkap', {
                  required: 'Nama Lengkap tidak boleh kosong'
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Nama Lengkap"
              />
            </div>
            {errors.namaLengkap && <p className="text-red-400 text-sm">{errors.namaLengkap.message}</p>}

            {/* Email field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input
                type="email"
                {...register('email', {
                  required: 'Email tidak boleh kosong',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Format email tidak valid'
                  }
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Email"
              />
            </div>
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}

            {/* Alamat field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <input
                {...register('alamat', {
                  required: 'Alamat tidak boleh kosong'
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Alamat"
              />
            </div>
            {errors.alamat && <p className="text-red-400 text-sm">{errors.alamat.message}</p>}

            {/* Nomor Telepon field */}
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <input
                type="tel"
                {...register('nomorTelepon', {
                  required: 'Nomor Telepon tidak boleh kosong',
                  pattern: {
                    value: /^[0-9]+$/,
                    message: 'Nomor telepon hanya boleh berisi angka'
                  }
                })}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Nomor Telepon"
              />
            </div>
            {errors.nomorTelepon && <p className="text-red-400 text-sm">{errors.nomorTelepon.message}</p>}

            {/* Submit button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#A91D92] hover:bg-purple-700 text-white font-bold py-3 px-12 rounded-full transition-colors duration-200"
              >
                Sign Up
              </button>
            </div>

            {/* Login link */}
            <div className="text-center mt-4">
              <p className="text-white text-sm">
                Sudah punya akun?{' '}
                <Link href="/auth/login" className="text-[#A91D92] hover:text-purple-300 font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;