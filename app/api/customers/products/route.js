import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(request) {
  try {
    // Mengambil parameter query dari URL
    const { searchParams } = new URL(request.url);
    const brand = searchParams.get('brand');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy');
    const search = searchParams.get('search');
    
    // Membangun filter query
    let whereClause = {};
    
    if (brand && brand !== "semua") {
      whereClause.brand = {
        equals: brand,
        mode: 'insensitive'
      };
    }
    
    if (category) {
      whereClause.category = {
        equals: category,
        mode: 'insensitive'
      };
    }
    
    // Filter rentang harga
    if (minPrice || maxPrice) {
      whereClause.price = {};
      
      if (minPrice) {
        whereClause.price.gte = parseInt(minPrice);
      }
      
      if (maxPrice) {
        whereClause.price.lte = parseInt(maxPrice);
      }
    }
    
    // Pencarian berdasarkan nama, brand, atau kategori
    if (search) {
      whereClause.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { brand: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    // Membangun opsi pengurutan
    let orderBy = { createdAt: 'desc' }; // Default: terbaru
    
    if (sortBy === 'harga-asc') {
      orderBy = { price: 'asc' };
    } else if (sortBy === 'harga-desc') {
      orderBy = { price: 'desc' };
    } else if (sortBy === 'popular') {
      orderBy = { isFeatured: 'desc' };
    }
    
    // Mengambil data dari database menggunakan Prisma
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy,
      include: {
        productColors: {
          select: {
            color: true
          }
        }
      }
    });
    
    // Memformat data untuk respon
    const formattedProducts = products.map(product => ({
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
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}