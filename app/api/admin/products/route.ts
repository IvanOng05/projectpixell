// app/api/admin/products/route.ts
import { NextResponse } from 'next/server';
import { fetchProducts } from '@/app/lib/data.server';

export async function GET() {
  try {
    const data = await fetchProducts();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}