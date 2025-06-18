import { TestimonialCard, TestimonialStats } from '@/app/ui/customers/testimonial';
import Footer from "@/app/ui/footer";
import { statictestimonials, fetchTestimonialsFromDB } from '@/app/lib/data';

export default async function CustomersPage() {
  const testimonials = await (await fetchTestimonialsFromDB()) || statictestimonials;;
  return (
    <div className="w-full bg-white">
      {/* Header Full Width */}
      <div className="w-full py-5 bg-gradient-to-r from-purple-900/80 to-[#A91D92]/80 z-10">
        <h1 className="text-white text-4xl font-bold py-10 text-center">
          Testimoni Pelanggan
        </h1>
      </div>

      {/* Wrapper Konten */}
      <div className="w-full px-4 md:px-10 lg:px-20 xl:px-32 py-12 space-y-10">
        {/* Statistik */}
        <div className="flex justify-end">
          <div className="w-full max-w-5xl">
            <TestimonialStats testimonials={testimonials} />
          </div>
        </div>

        {/* Testimoni */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
              phoneModel="Tidak Diketahui"
              avatarUrl={undefined}
              className="hover:shadow-lg"
            />
          ))}
        </div>
      </div>
      <footer className="w-full md:w-full bg-white">
        <Footer />
      </footer>
    </div>
  );
}