'use server'; // Mark this file as server-side only

import postgres from 'postgres';

// Configure your Postgres connection
const sql = postgres(process.env.DATABASE_URL || '', {
  // Your configuration options
});

// Example function to fetch data
export async function fetchDataFromDB() {
  const result = await sql`SELECT * FROM your_table`;
  return result;
}