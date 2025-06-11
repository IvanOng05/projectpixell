"use client";

import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  phoneModel: string;
  avatarUrl?: string;
  className?: string;
}

export function TestimonialCard({
  name,
  rating,
  comment,
  date,
  phoneModel,
  avatarUrl,
  className = "",
}: TestimonialCardProps) {
  return (
    <div className={`bg-whitesmoke rounded-lg border p-5 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col ${className} hover:scale-105 transform`}>
      {/* Header dengan Avatar dan Nama */}
      <div className="flex flex-col items-center mb-5">
        <div className="w-20 h-20 rounded-full bg-gray-100 mb-3 overflow-hidden shadow-md border-2 border-gray-200">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <span className="text-2xl font-bold text-gray-600">
                {name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-gray-800 text-lg">{name}</h3>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>

      {/* Rating Bintang dengan Animasi */}
      <div className="flex justify-center mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={20}
              className={`transform transition-all duration-300 ${
                i < rating 
                  ? "fill-yellow-400 text-yellow-400 hover:scale-110" 
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bagian Komentar dengan Styling yang Lebih Baik */}
      <p className="font-bold text-gray-700 mb-1">Komentar:</p>
      <div className="bg-gray-50 p-3 rounded-lg italic mb-3 shadow-inner border border-gray-100">
        <p className="text-gray-700 leading-relaxed">"{comment}"</p>
      </div>

      {/* Phone Model dengan Badge Style */}
      <div className="mt-auto">
        <span className="inline-block bg-[#f0ebdd] text-gray-800 font-semibold px-3 py-1 rounded-full text-sm">
          {phoneModel}
        </span>
      </div>
    </div>
  );
}

interface TestimonialStatsProps {
  testimonials: TestimonialCardProps[];
}

export function TestimonialStats({ testimonials }: TestimonialStatsProps) {
  const totalRating = testimonials.reduce((acc, curr) => acc + curr.rating, 0);
  const averageRating = (totalRating / testimonials.length).toFixed(1);
  const ratingCount = testimonials.length;
  
  const ratingDistribution = Array(5).fill(0);
  testimonials.forEach((t) => {
    ratingDistribution[5 - t.rating]++;
  });

  // Menghitung persentase untuk progress bar
  const percentages = ratingDistribution.map(count => 
    Math.round((count / testimonials.length) * 100)
  );

  return (
    <div className="bg-[#f0ebdd] rounded-xl p-6 w-full max-w-4xl shadow-lg border border-gray-200">
      {/* Header Section dengan Design yang Lebih Menarik */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="text-center md:text-left">
          <div className="flex items-baseline">
            <p className="text-4xl font-bold text-gray-800">{averageRating}</p>
            <p className="text-xl text-gray-600 ml-1">/5</p>
          </div>
          <p className="text-gray-600 font-medium">{ratingCount}+ rating</p>
        </div>
        
        <div className="flex flex-col items-center">
          <p className="text-center font-semibold text-xl mb-2">Total Rating</p>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className="w-6 h-6 fill-orange-500 text-orange-500 animate-pulse" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Rating Distribution dengan Visual yang Ditingkatkan */}
      <div className="bg-white border rounded-lg p-5 shadow-inner">
        {[5, 4, 3, 2, 1].map((star, idx) => {
          const count = ratingDistribution[idx];
          const percent = percentages[idx];
          
          return (
            <div key={star} className="mb-3 last:mb-0">
              <div className="flex items-center mb-1">
                <div className="flex gap-1 w-20">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                  ))}
                </div>
                
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                </div>
                
                <span className="text-sm font-medium text-gray-700 w-12 text-right">
                  {count} ({percent}%)
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}