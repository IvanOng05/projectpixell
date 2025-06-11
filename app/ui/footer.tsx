"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-800 to-gray-900 text-white border-t border-[#A91D92]-500/30">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/LOGOPIXELL.png"
              alt="Pixell Logo"
              width={60}
              height={160}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-gray-300">
            Penyedia smartphone berkualitas dengan pelayanan terbaik di Yogyakarta.
          </p>
          <div className="flex space-x-4 ">
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

        {/* Quick Links */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#A91D92]-300">Tautan Cepat</h3>
          <ul className="space-y-3">
            <FooterLink href="/customers" text="Beranda" />
            <FooterLink href="/customers/produk" text="Produk" />
            <FooterLink href="/customers/tentangkami" text="Tentang Kami" />
            <FooterLink href="/customers/kontak" text="Kontak" />
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#A91D92]e-300">Hubungi Kami</h3>
          <div className="space-y-4">
            <ContactItem 
              icon={
                <svg className="w-5 h-5 text-[#A91D92]-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              }
              text="+62 812-3456-7890"
              href="tel:+6281234567890"
            />
            <ContactItem 
              icon={
                <svg className="w-5 h-5 text-[#A91D92]-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              text="info@pixellphone.com"
              href="mailto:info@pixellphone.com"
            />
            <ContactItem 
              icon={
                <svg className="w-5 h-5 text-[#A91D92]-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              }
              text="Jl. Colombo No.1, Sleman, Yogyakarta 55281"
            />
          </div>
          <Link 
            href="https://wa.me/6281234567890" 
            target="_blank"
            className="flex items-center bg-gray-700 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            <Image
              src="/LOGOWHATSAPP.png"
              alt="WhatsApp"
              width={240}
              height={48}
            />
          </Link>
        </div>

        {/* Business Hours */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-[#A91D92]-300">Jam Operasional</h3>
          <div className="space-y-2 text-gray-300">
            <p className="flex justify-between">
              <span>Senin - Jumat:</span>
              <span>09:30 - 22:00 WIB</span>
            </p>
            <p className="flex justify-between">
              <span>Sabtu - Minggu:</span>
              <span>10:00 - 21:00 WIB</span>
            </p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Pixell Phone. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

// Reusable components for footer
function FooterLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link 
        href={href} 
        className="text-gray-300 hover:text-purple-300 transition-colors duration-300"
      >
        {text}
      </Link>
    </li>
  );
}

function ContactItem({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  return (
    <div className="flex items-start space-x-3">
      <div className="mt-0.5">{icon}</div>
      {href ? (
        <Link href={href} className="text-gray-300 hover:text-white transition-colors">
          {text}
        </Link>
      ) : (
        <p className="text-gray-300">{text}</p>
      )}
    </div>
  );
}

function SocialIcon({ href, src, alt }: { href: string; src: string; alt: string }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      className="bg-gray-700 hover:bg-purple-600 p-2 rounded-full transition-colors duration-300"
    >
      <Image 
        src={src} 
        alt={alt} 
        width={24} 
        height={24} 
        className="w-5 h-5 object-contain"
      />
    </Link>
  );
}

function PaymentMethod({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="bg-white p-1.5 rounded-md">
      <Image 
        src={src} 
        alt={alt} 
        width={40} 
        height={24} 
        className="h-6 w-auto object-contain"
      />
    </div>
  );
}