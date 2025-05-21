'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type ResetPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  const newPassword = watch('newPassword', '');

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      console.log('Resetting password with:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Kata sandi berhasil diubah!', { theme: 'light' });
      router.push('/Auth/login');
    } catch (error) {
      toast.error('Gagal mengubah kata sandi', { theme: 'light' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/Auth/forgot-password" className="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 rounded-full border-2 border-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Atur ulang kata sandi</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Masukkan kata sandi baru
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                {...register('newPassword', {
                  required: 'Kata sandi baru harus diisi',
                  minLength: {
                    value: 6,
                    message: 'Kata sandi minimal 6 karakter'
                  }
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bg-[#A91D92]"
                placeholder="Masukkan kata sandi baru"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? 
                  <FaEyeSlash className="text-gray-500" /> : 
                  <FaEye className="text-gray-500" />
                }
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Konfirmasi kata sandi baru
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register('confirmPassword', {
                  required: 'Konfirmasi kata sandi harus diisi',
                  validate: value => 
                    value === newPassword || 'Kata sandi tidak cocok'
                })}
                className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bg-[#A91D92]"
                placeholder="Masukkan ulang kata sandi baru"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 
                  <FaEyeSlash className="text-gray-500" /> : 
                  <FaEye className="text-gray-500" />
                }
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-bg-[#A91D92] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {isSubmitting ? 'MENYIMPAN...' : 'SIMPAN'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;