import { NextResponse } from "next/server";
import postgres from "postgres";
import { Transaksi } from "@/app/lib/definitions";
import { formatCurrency } from "@/app/lib/utils";

// Inisialisasi koneksi database
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// Fungsi utilitas untuk menangani error
const handleError = (error: unknown, message: string) => {
  console.error(`${message}:`, error);
  return NextResponse.json({ error: message }, { status: 500 });
};

export async function GET(request: Request) {
  try {
    const data = await sql<Transaksi[]>`SELECT * FROM transaksi ORDER BY tanggal DESC`;
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to fetch transactions");
  }
}

export async function POST(request: Request) {
  try {
    const transaksi: Transaksi = await request.json();
    const { id_transaksi, id_produk, nama_pembeli, tanggal, total_harga, status } = transaksi;

    // Validasi input dasar
    if (!id_transaksi || !id_produk || !nama_pembeli || !tanggal || total_harga == null || !status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO transaksi (id_transaksi, id_produk, nama_pembeli, tanggal, total_harga, status)
      VALUES (${id_transaksi}, ${id_produk}, ${nama_pembeli}, ${tanggal}, ${total_harga}, ${status})
      RETURNING *;
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return handleError(error, "Failed to create transaction");
  }
}

export async function PUT(request: Request) {
  try {
    const transaksi: Transaksi = await request.json();
    const { id_transaksi, id_produk, nama_pembeli, tanggal, total_harga, status } = transaksi;

    if (!id_transaksi) {
      return NextResponse.json({ error: "ID Transaksi is required" }, { status: 400 });
    }

    const result = await sql`
      UPDATE transaksi
      SET id_produk = ${id_produk}, nama_pembeli = ${nama_pembeli}, tanggal = ${tanggal}, total_harga = ${total_harga}, status = ${status}
      WHERE id_transaksi = ${id_transaksi}
      RETURNING *;
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json(result[0], { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to update transaction");
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id_transaksi = url.pathname.split("/").pop();

    if (!id_transaksi) {
      return NextResponse.json({ error: "ID Transaksi is required" }, { status: 400 });
    }

    const result = await sql`
      DELETE FROM transaksi WHERE id_transaksi = ${id_transaksi}
      RETURNING *;
    `;
    if (result.length === 0) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
  } catch (error) {
    return handleError(error, "Failed to delete transaction");
  }
}