// app/api/admin/transactions/route.ts
import { NextResponse } from 'next/server';
import { fetchTransactions } from '@/app/lib/data.server';

export async function GET() {
  try {
    const data = await fetchTransactions();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({}, { status: 500 });
  }
}