'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

type ForgotPasswordFormData = {
  emailOrPhone: string;
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      console.log('Sending reset link to:', data.emailOrPhone);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Link reset password telah dikirim!', { theme: 'light' });
      router.push('/auth/aturkatasandi');
    } catch (error) {
      toast.error('Gagal mengirim link reset password', { theme: 'light' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/auth/login" className="inline-block">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
        </div>

        {/* Lock Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 rounded-full border-2 border-gray-200 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" />
            </svg>
          </div>
        </div>

        {/* Title & Description */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Atur ulang kata sandi</h1>
          <p className="text-gray-700 text-base mb-6">
            Masukkan alamat email atau nomor telepon yang terdaftar pada akun Anda. Kami akan mengirimkan tautan untuk mengatur ulang kata sandi Anda melalui email atau Whatsapp.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <input
              type="text"
              {...register('emailOrPhone', {
                required: 'Email atau nomor telepon harus diisi',
                validate: value => {
                  // Basic validation for email or phone
                  const isEmail = /\S+@\S+\.\S+/.test(value);
                  const isPhone = /^\d{10,15}$/.test(value);
                  return (isEmail || isPhone) || 'Format email atau nomor telepon tidak valid';
                }
              })}
              placeholder="Masukkan email atau nomor telepon"
              className="w-full px-4 py-3 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bg-[#A91D92]"
            />
            {errors.emailOrPhone && (
              <p className="text-red-600 text-sm mt-1">{errors.emailOrPhone.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#A91D92] hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            {isSubmitting ? 'Mengirim...' : 'LANJUT'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;