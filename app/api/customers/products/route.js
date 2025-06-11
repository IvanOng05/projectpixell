// app/api/customers/products/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function GET(request) {
  let client;
  try {
    client = await pool.connect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const sortBy = searchParams.get('sortBy');
    const search = searchParams.get('search');

    let query = `
      SELECT id_produk, nama_produk, harga, stock, kategori, deskripsi, foto, created_at, updated_at
      FROM produk
      WHERE 1=1
    `;
    const params = [];

    if (category) {
      params.push(category.toLowerCase());
      query += ` AND LOWER(kategori) = LOWER($${params.length})`;
    }

    if (minPrice) {
      params.push(parseFloat(minPrice));
      query += ` AND harga >= $${params.length}`;
    }

    if (maxPrice) {
      params.push(parseFloat(maxPrice));
      query += ` AND harga <= $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      query += ` AND (LOWER(nama_produk) LIKE $${params.length} OR LOWER(kategori) LIKE $${params.length} OR LOWER(deskripsi) LIKE $${params.length})`;
    }

    query += ` ORDER BY created_at DESC`;
    if (sortBy === 'harga-asc') query += `, harga ASC`;
    else if (sortBy === 'harga-desc') query += `, harga DESC`;

    const result = await client.query(query, params);
    const formattedProducts = result.rows.map(product => ({
      id_produk: product.id_produk,
      nama_produk: product.nama_produk,
      harga: product.harga,
      stock: product.stock,
      kategori: product.kategori,
      deskripsi: product.deskripsi,
      foto: product.foto,
      created_at: product.created_at,
      updated_at: product.updated_at,
      brand: null,
      isFeatured: false,
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error.message, error.stack);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error.message },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}