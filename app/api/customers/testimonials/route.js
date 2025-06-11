// app/api/testimonials/route.js
import { NextResponse } from 'next/server';
import { pool } from '@/app/lib/db';

export async function GET() {
  let client;
  try {
    client = await pool.connect();
    const query = `
      SELECT id, name, rating, comment, date, phone_model as phoneModel, avatar_url as avatarUrl
      FROM testimonials
      ORDER BY date DESC
    `;
    const result = await client.query(query);

    const formattedTestimonials = result.rows.map(row => ({
      id: row.id,
      name: row.name,
      rating: parseFloat(row.rating),
      comment: row.comment,
      date: row.date,
      phoneModel: row.phoneModel,
      avatarUrl: row.avatarUrl,
    }));

    return NextResponse.json(formattedTestimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials', details: error.message },
      { status: 500 }
    );
  } finally {
    if (client) client.release();
  }
}