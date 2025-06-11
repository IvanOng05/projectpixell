'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaRedo } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Image from 'next/image';

interface LoginFormData {
  username: string;
  password: string;
  captchaInput: string;
}

interface ErrorObject {
  username?: string;
  password?: string;
  captcha?: string;
}

const generateRandomCaptcha = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const LoginPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
    captchaInput: '',
  });

  const [errors, setErrors] = useState<ErrorObject>({});
  const [captcha, setCaptcha] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setCaptcha(generateRandomCaptcha());
  }, []);

  const validateForm = (): ErrorObject => {
    const newErrors: ErrorObject = {};
    
    if (formData.username.trim() === '') {
      newErrors.username = 'Username tidak boleh kosong';
    } else if (formData.username !== 'admin123' && formData.username !== 'user123') {
      newErrors.username = 'Username salah';
    }
    
    if (formData.password.trim() === '') {
      newErrors.password = 'Password tidak boleh kosong';
    } else if (formData.password !== '12345') {
      newErrors.password = 'Password salah';
    }
  
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (attemptsLeft === 0) return;

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setAttemptsLeft(prev => Math.max(prev - 1, 0));
      toast.error(`Login Gagal! Sisa kesempatan: ${Math.max(attemptsLeft - 1, 0)}`, { theme: 'dark', position: "top-right" });
      return;
    }

    toast.success('Login Berhasil!', { theme: 'dark', position: "top-right" });
    
    // Route based on username
    if (formData.username === 'admin123') {
      router.push('/admin/dashboard');
    } else if (formData.username === 'user123') {
      router.push('/customers');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-90 bg-cover bg-center" 
         style={{ backgroundImage: 'url(/bg-hitam.png)' }}>
      <div className="w-full max-w-md px-6 py-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold mb-1">
          <Link href="/">
            <Image
              src="/LOGOPIXELL.png" 
              alt="Pixell Logo"
              width={530}
              height={50}
              className="object-contain"
            />
          </Link>

          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5 w-full">
          <div className="space-y-2">
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Username"
              />
            </div>
            {errors.username && (
              <p className="text-red-600 text-sm italic mt-1">{errors.username}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="bg-white rounded-lg flex items-center p-2">
              <span className="text-gray-500 px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border-none focus:ring-0 focus:outline-none"
                placeholder="Password"
                disabled={attemptsLeft === 0}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-2"
              >
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm italic mt-1">{errors.password}</p>
            )}
          </div>
          
          <div className="flex justify-end">
            <Link href="/auth/lupapassword" className="text-yellow-400 hover:text-yellow-300 text-sm">
              Lupa Password?
            </Link>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#A91D92] hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
            >
              Sign In
            </button>
          </div>

          <div className="mt-4 text-center">
            <Link href="/auth/register" className="text-white hover:text-purple-300 text-sm">
              Belum punya akun?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;