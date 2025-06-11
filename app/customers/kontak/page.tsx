"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/app/ui/footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      // In a real implementation, you would send the form data to your server
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setSubmitMessage({
        type: "success",
        text: "Pesan Anda telah terkirim. Kami akan segera menghubungi Anda!"
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "Terjadi kesalahan. Silakan coba lagi nanti."
      });
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage({ type: "", text: "" }), 5000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-9">
      {/* Hero Section */}
      <div className=" inset-0 bg-gradient-to-r from-purple-900/80 to-[#A91D92]/80 z-10 py-9 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Kami siap membantu Anda dengan pertanyaan, saran, atau kebutuhan seputar smartphone Anda.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>
              <p className="text-gray-600 mb-8">
                Jangan ragu untuk menghubungi kami melalui berbagai saluran komunikasi di bawah ini atau mengunjungi toko kami secara langsung.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <ContactCard 
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                title="Telepon"
                content="+62 812-3456-7890"
                link="tel:+6281234567890"
              />
              
              <ContactCard 
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Email"
                content="info@pixellphone.com"
                link="mailto:info@pixellphone.com"
              />
              
              <ContactCard 
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                title="Alamat"
                content="Jl. Colombo No.1, Sleman, Yogyakarta 55281"
              />
              
              <ContactCard 
                icon={
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Jam Operasional"
                content={
                  <div className="space-y-1">
                    <p>Senin - Jumat: 09:30 - 22:00 WIB</p>
                    <p>Sabtu - Minggu: 10:00 - 21:00 WIB</p>
                  </div>
                }
              />
            </div>

            {/* WhatsApp Button */}
            <Link 
              href="https://wa.me/6281234567890" 
              target="_blank"
              className="flex items-center justify-center space-x-2 bg-gray-300 hover:bg-purple-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 w-full md:w-auto"
            >
              <Image
                src="/LOGOWHATSAPP.png"
                alt="WhatsApp"
                width={240}
                height={240}
                className="w-240 h-100"
              />
          
            </Link>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <SocialIcon 
                  href="https://www.facebook.com" 
                  src="/LOGOFACEBOOK.png" 
                  alt="Facebook"
                />
                <SocialIcon 
                  href="https://www.instagram.com" 
                  src="/LOGOINSTAGRAM.png" 
                  alt="Instagram"
                />
                <SocialIcon 
                  href="https://www.pinterest.com" 
                  src="/LOGOPINTEREST.png" 
                  alt="Pinterest"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Kirim Pesan</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Masukkan alamat email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Masukkan nomor telepon"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Masukkan subjek pesan"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-[#A91D92] hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                </button>
              </div>
              
              {/* Success/Error Message */}
              {submitMessage.text && (
                <div 
                  className={`py-3 px-4 rounded-lg ${
                    submitMessage.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {submitMessage.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <footer className="w-full bg-white shadow-inner">
              <Footer />
            </footer>
    </div>
  );
}

// Reusable components
function ContactCard({ icon, title, content, link }) {
  const ContentComponent = link ? (
    <Link href={link} className="text-gray-600 hover:text-purple-600 transition-colors">
      {typeof content === "string" ? content : content}
    </Link>
  ) : (
    <div className="text-gray-600">
      {typeof content === "string" ? content : content}
    </div>
  );

  return (
    <div className="flex items-start space-x-4">
      <div className="p-3 bg-purple-100 rounded-full">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
        {ContentComponent}
      </div>
    </div>
  );
}

function SocialIcon({ href, src, alt }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      className="bg-gray-200 hover:bg-purple-600 p-3 rounded-full transition-colors duration-300 group"
    >
      <Image 
        src={src} 
        alt={alt} 
        width={24} 
        height={24} 
        className="w-6 h-6 object-contain hover:[#A91D92]"
      />
    </Link>
  );
}