'use server';

import { sql } from './data';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';

const TransaksiSchema = z.object({
  id_produk: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: 'Produk harus dipilih.',
  }),
  nama_pembeli: z.string().min(1, 'Nama pembeli harus diisi.'),
  tanggal: z.string().min(1, 'Tanggal harus diisi.'),
  total_harga: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: 'Total harga harus angka yang valid dan tidak negatif.',
  }),
  status: z.enum(['Diproses', 'Selesai', 'Dibatalkan'], {
    errorMap: () => ({ message: 'Status tidak valid.' }),
  }),
});

export async function createTransaksi(prevState: any, formData: FormData) {
  const validatedFields = TransaksiSchema.safeParse({
    id_produk: formData.get('id_produk'),
    nama_pembeli: formData.get('nama_pembeli'),
    tanggal: formData.get('tanggal'),
    total_harga: formData.get('total_harga'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id_produk, nama_pembeli, tanggal, total_harga, status } = validatedFields.data;
  const id_produk_num = Number(id_produk);
  const total_harga_num = Number(total_harga);

  try {
    await sql`
      INSERT INTO transaksi (id_produk, nama_pembeli, tanggal, total_harga, status)
      VALUES (${id_produk_num}, ${nama_pembeli}, ${tanggal}, ${total_harga_num}, ${status})
    `;
    return { success: true }; // Return success instead of redirect
  } catch (error: any) {
    console.error('Database Error:', error.message);
    if (error.code === '23505') { // Duplicate key violation
      return { error: 'Gagal membuat transaksi: Duplikat ID transaksi.' };
    } else if (error.code === '23503') { // Foreign key violation
      return { error: 'Produk tidak ditemukan di database.' };
    } else if (error.code === '23502') { // Not null violation
      return { error: 'Salah satu field wajib tidak diisi.' };
    }
    return { error: `Database Error: Failed to create transaksi - ${error.message}` };
  }
}

export async function updateTransaksi(id_transaksi: number, prevState: any, formData: FormData) {
  const validatedFields = TransaksiSchema.safeParse({
    id_produk: formData.get('id_produk'),
    nama_pembeli: formData.get('nama_pembeli'),
    tanggal: formData.get('tanggal'),
    total_harga: formData.get('total_harga'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id_produk, nama_pembeli, tanggal, total_harga, status } = validatedFields.data;

  try {
    await sql`
      UPDATE transaksi
      SET id_produk = ${id_produk}, nama_pembeli = ${nama_pembeli}, tanggal = ${tanggal}, total_harga = ${total_harga}, status = ${status}
      WHERE id_transaksi = ${id_transaksi}
    `;
  } catch (error) {
    return { error: 'Database Error: Failed to update transaksi.' };
  }

  redirect('/admin/DaftarTransaksi');
}

export async function deleteTransaksi(id_transaksi: number) {
  try {
    await sql`
      DELETE FROM transaksi
      WHERE id_transaksi = ${id_transaksi}
    `;
  } catch (error) {
    return { error: 'Database Error: Failed to delete transaksi.' };
  }
  // Optional: Redirect after deletion if needed
  redirect('/admin/DaftarTransaksi');
}

const ProdukSchema = z.object({
  nama_produk: z.string().min(1, 'Nama produk harus diisi.'),
  harga: z.number().positive('Harga harus lebih dari 0.'),
  stock: z.number().int().min(0, 'Stock tidak boleh negatif.'),
  foto: z.string().url('URL foto tidak valid.').optional().or(z.literal('')),
  kategori: z.string().min(1, 'Kategori harus diisi.'),
  deskripsi: z.string().optional().or(z.literal('')),
});

export async function createProduk(_: any, formData: FormData) {
  // Parse and validate form data
  const validatedFields = ProdukSchema.safeParse({
    nama_produk: formData.get('nama_produk'),
    harga: Number(formData.get('harga')),
    stock: Number(formData.get('stock')),
    foto: formData.get('foto') || null, // Handle empty string as null
    kategori: formData.get('kategori'),
    deskripsi: formData.get('deskripsi') || null, // Handle empty string as null
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { nama_produk, harga, stock, foto, kategori, deskripsi } = validatedFields.data;

  try {
    await sql`
      INSERT INTO produk (nama_produk, harga, stock, foto, kategori, deskripsi)
      VALUES (${nama_produk}, ${harga}, ${stock}, ${foto}, ${kategori}, ${deskripsi})
    `;
  } catch (error: any) {
    // Log the error for debugging (in a real app, log to a service like Sentry)
    console.error('Database Error:', error.message);

    // Check for specific error types (e.g., unique constraint violation)
    if (error.code === '23505') { // PostgreSQL unique violation error code
      return { error: 'Nama produk sudah ada di database.' };
    }
    return { error: `Database Error: Failed to create produk - ${error.message}` };
  }

  redirect('/admin/DaftarProduk');
}

export async function updateProduk(id_produk: number, _: any, formData: FormData) {
  try {
    const parsed = ProdukSchema.safeParse({
      nama_produk: formData.get('nama_produk'),
      harga: Number(formData.get('harga')),
      stock: Number(formData.get('stock')),
      foto: formData.get('foto') || null,
      kategori: formData.get('kategori'),
      deskripsi: formData.get('deskripsi') || null,
    });

    if (!parsed.success) {
      return { error: parsed.error.flatten().fieldErrors };
    }

    const { nama_produk, harga, stock, foto, kategori, deskripsi } = parsed.data;

    const { rowCount } = await sql`
      SELECT 1 FROM produk WHERE id_produk = ${id_produk}
    `;
    if (rowCount === 0) {
      return { error: 'Produk dengan ID tersebut tidak ditemukan.' };
    }

    await sql`
      UPDATE produk
      SET nama_produk = ${nama_produk}, harga = ${harga}, stock = ${stock}, foto = ${foto}, kategori = ${kategori}, deskripsi = ${deskripsi}
      WHERE id_produk = ${id_produk}
    `;

    return { success: true }; // Return success response instead of redirect
  } catch (error: any) {
    console.error('Database Error:', error.message);
    if (error.code === '23505') {
      return { error: 'Nama produk sudah ada di database.' };
    }
    return { error: `Gagal memperbarui produk: ${error.message}` };
  }
}

export async function deleteProduk(id_produk: number) {
  try {
    await sql`DELETE FROM produk WHERE id_produk = ${id_produk}`;
    return { success: true };
  } catch (error) {
    return { error: 'Database Error: Failed to delete produk.' };
  }
}