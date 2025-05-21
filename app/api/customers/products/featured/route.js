import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET() {
  try {
    // Mengambil produk unggulan dari database
    const featuredProducts = await prisma.product.findMany({
      where: {
        isFeatured: true
      },
      include: {
        productColors: {
          select: {
            color: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Memformat data untuk respons
    const formattedProducts = featuredProducts.map(product => ({
      id: product.id,
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price,
      image: product.image,
      isFeatured: product.isFeatured,
      createdAt: product.createdAt,
      colors: product.productColors.map(pc => pc.color)
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured products' },
      { status: 500 }
    );
  }
}