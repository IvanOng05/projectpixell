import Image from 'next/image';
import Footer from '@/app/ui/footer';

export default function AboutPixellPage() {
  const founders = [
    { name: "Adi", role: "CEO & Founder", bio: "Spesialis teknologi mobile dengan pengalaman 10+ tahun di industri smartphone." },
    { name: "Ana", role: "Head of Operations", bio: "Ahli dalam manajemen rantai pasokan dan operasional retail." },
    { name: "Ani", role: "Marketing Director", bio: "Pakar branding dan strategi pemasaran digital." }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Hero Banner */}
      <section className="relative h-96 w-full mt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-[#A91D92]/80 py-7" />
        <div className="relative z-20 flex items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Tentang PIXELL</h1>
            <p className="text-xl md:text-2xl text-white/90">
              Menyediakan teknologi terkini dengan pelayanan terbaik sejak 2015
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-grow">
        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="w-full lg:w-1/2">
                <div className="rounded-xl overflow-hidden shadow-2xl aspect-video">
                  <Image 
                    src="/fototoko.png" 
                    alt="PIXELL Phone Store" 
                    width={800} 
                    height={600} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
                  Visi & Misi Kami
                </h2>
                <div className="space-y-6 text-gray-600">
                  <p className="text-lg">
                    PIXELL Phone hadir sejak 2015 dengan komitmen untuk menyediakan smartphone berkualitas dengan harga terjangkau bagi masyarakat Yogyakarta dan sekitarnya.
                  </p>
                  <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
                    <h3 className="text-xl font-semibold text-purple-800 mb-3">Visi Perusahaan</h3>
                    <p>
                      Menjadi pusat teknologi mobile terdepan di Indonesia dengan fokus pada kualitas produk dan kepuasan pelanggan.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-400">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">Misi Perusahaan</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Menyediakan produk teknologi terkini dengan harga kompetitif</li>
                      <li>Memberikan pengalaman belanja yang menyenangkan</li>
                      <li>Membangun hubungan jangka panjang dengan pelanggan</li>
                      <li>Mendukung perkembangan teknologi di Indonesia</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-purple-900 to-[#A91D92] py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem number="8+" label="Tahun Pengalaman" />
              <StatItem number="50K+" label="Pelanggan" />
              <StatItem number="100+" label="Merek Terdaftar" />
              <StatItem number="24/7" label="Layanan Pelanggan" />
            </div>
          </div>
        </section>

        {/* Founders Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tim Kami</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Dibangun oleh tim profesional yang berdedikasi untuk memberikan yang terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {founders.map((person) => (
                <div 
                  key={person.name} 
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image 
                      src="/FOTOORANG.png" 
                      alt={person.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{person.name}</h3>
                    <p className="text-purple-600 font-medium mb-3">{person.role}</p>
                    <p className="text-gray-600">{person.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Nilai-Nilai Kami
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard 
                icon="⚡" 
                title="Inovasi" 
                description="Terus menghadirkan produk dan layanan terkini untuk memenuhi kebutuhan pelanggan" 
              />
              <ValueCard 
                icon="🤝" 
                title="Integritas" 
                description="Transparansi dan kejujuran dalam setiap aspek bisnis kami" 
              />
              <ValueCard 
                icon="❤️" 
                title="Kepuasan Pelanggan" 
                description="Pelanggan adalah prioritas utama dalam setiap keputusan kami" 
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// Reusable Components
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-4">
      <p className="text-3xl md:text-4xl font-bold mb-2">{number}</p>
      <p className="text-sm md:text-base text-purple-200">{label}</p>
    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}