// app/ui/customers/ProductCard.tsx
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  id_produk: string;
  nama_produk: string;
  foto: string | null | undefined; // Allow null/undefined
  kategori: string;
  harga: number;
  colors: string[];
  isFeatured: boolean;
};

// Utility function to validate URL
const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ProductCard({
  id_produk,
  nama_produk,
  foto,
  kategori,
  harga,
  colors,
  isFeatured,
}: ProductCardProps) {
  // Determine the image source
  const imageSrc = foto && isValidUrl(foto) ? foto : '/placeholder.png';

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/products/${id_produk}`}>
        <div className="relative w-full h-48 mb-4">
          {/* <Image
            src={imageSrc}
            alt={nama_produk || 'Product image'}
            fill
            className="object-cover rounded"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={isFeatured}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              (e.target as HTMLImageElement).src = '/placeholder.png';
            }} */}
          />
        </div>
        <h3 className="text-lg font-semibold">{nama_produk}</h3>
        <p className="text-gray-600">{kategori}</p>
        <p className="text-purple-600 font-bold">
          {new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
          }).format(harga)}
        </p>
      </Link>
    </div>
  );
}