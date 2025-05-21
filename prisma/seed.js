import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  // Hapus data lama
  await prisma.transaction.deleteMany({});
  await prisma.product.deleteMany({});

  // Create products
  const vivo = await prisma.product.create({
    data: {
      name: 'Vivo Y100',
      price: 2000000,
      stock: 15,
      category: 'Handphone',
      description: 'The Vivo Y100 features a 6.7-inch AMOLED display, Snapdragon 695 processor, 8GB RAM, and 128GB storage.',
      image: '/images/vivo-y100.jpg',
    },
  });

  const samsung = await prisma.product.create({
    data: {
      name: 'Samsung Smart Watch 4',
      price: 3500000,
      stock: 8,
      category: 'Smart Watch',
      description: 'The Samsung Galaxy Watch 4 features advanced health monitoring, fitness tracking, and seamless integration with Samsung devices.',
      image: '/images/samsung-watch4.jpg',
    },
  });

  const infinix = await prisma.product.create({
    data: {
      name: 'Infinix Note 50 Pro',
      price: 3000000,
      stock: 12,
      category: 'Handphone',
      description: 'The Infinix Note 50 Pro features a large 6.8-inch display, 108MP camera, 5000mAh battery, and 256GB storage.',
      image: '/images/infinix-note50.jpg',
    },
  });

  const jbl = await prisma.product.create({
    data: {
      name: 'Speaker JBL PartyBox',
      price: 500000,
      stock: 20,
      category: 'Speaker',
      description: 'The JBL PartyBox delivers powerful JBL sound with a dazzling light show, perfect for any party.',
      image: '/images/jbl-partybox.jpg',
    },
  });

  const oppo = await prisma.product.create({
    data: {
      name: 'OPPO Reno12 F 5G',
      price: 4500000,
      stock: 10,
      category: 'Handphone',
      description: 'The OPPO Reno12 F 5G features a 64MP camera, 8GB RAM, and 5000mAh battery with 67W fast charging.',
      image: '/images/oppo-reno12f.jpg',
    },
  });

  // Create transactions
  await prisma.transaction.create({
    data: {
      productId: oppo.id,
      customerName: 'Budi Santoso',
      totalAmount: 4500000,
      status: 'Completed',
      date: new Date('2025-04-20'),
    },
  });

  await prisma.transaction.create({
    data: {
      productId: vivo.id,
      customerName: 'Siti Nurbaya',
      totalAmount: 2000000,
      status: 'Processing',
      date: new Date('2025-04-19'),
    },
  });

  await prisma.transaction.create({
    data: {
      productId: samsung.id,
      customerName: 'Ahmad Dahlan',
      totalAmount: 3500000,
      status: 'Completed',
      date: new Date('2025-04-18'),
    },
  });

  await prisma.transaction.create({
    data: {
      productId: jbl.id,
      customerName: 'Dewi Lestari',
      totalAmount: 500000,
      status: 'Cancelled',
      date: new Date('2025-04-17'),
    },
  });

  await prisma.transaction.create({
    data: {
      productId: infinix.id,
      customerName: 'Rizki Pratama',
      totalAmount: 3000000,
      status: 'Completed',
      date: new Date('2025-04-16'),
    },
  });

  await prisma.produk.createMany({
    data: [
      {
        nama: 'V30',
        harga: 5999000,
        stok: 50,
        foto: '/v30.png',
        deskripsi: 'VIVO V30 hadir dengan layar AMOLED 6.67 inci, chipset Snapdragon 7 Gen 3, dan kamera utama 50MP dengan teknologi ZEISS.',
        kategori: 'Smartphones',
        brand: 'vivo',
        warna: ['red', 'gray'],
        isFeatured: false
      },
      {
        nama: 'Watch GT',
        harga: 2499000,
        stok: 30,
        foto: '/watchgt.png',
        deskripsi: 'VIVO Watch GT dengan layar AMOLED 1.43 inci, baterai tahan lama hingga 14 hari, dan fitur pemantauan kesehatan lengkap.',
        kategori: 'Wearables',
        brand: 'vivo',
        warna: ['black'],
        isFeatured: false
      },
      {
        nama: 'Y28',
        harga: 2899000,
        stok: 75,
        foto: '/y28.png',
        deskripsi: 'VIVO Y28 dengan layar LCD 6.56 inci, chipset MediaTek Helio G85, baterai 5000mAh dan pengisian cepat 18W.',
        kategori: 'Smartphones',
        brand: 'vivo',
        warna: ['purple', 'gray'],
        isFeatured: false
      },
      {
        nama: 'Y36',
        harga: 3299000,
        stok: 60,
        foto: '/y29.png',
        deskripsi: 'VIVO Y36 dengan layar IPS LCD 6.64 inci, chipset Snapdragon 680, RAM 8GB dan penyimpanan 128GB yang dapat diperluas.',
        kategori: 'Smartphones',
        brand: 'vivo',
        warna: ['yellow', 'gray'],
        isFeatured: false
      },
      {
        nama: 'T2x',
        harga: 3999000,
        stok: 45,
        foto: '/y18.png',
        deskripsi: 'VIVO T2x dengan performa gaming tinggi, chipset Dimensity 6020, dan kamera 50MP untuk fotografi berkualitas tinggi.',
        kategori: 'Smartphones',
        brand: 'vivo',
        warna: ['green', 'blue', 'black'],
        isFeatured: false
      },
      {
        nama: 'V29e',
        harga: 4899000,
        stok: 40,
        foto: '/v30e.png',
        deskripsi: 'VIVO V29e dengan fitur Aura Light untuk fotografi potret, layar AMOLED 120Hz dan desain premium ultra-tipis.',
        kategori: 'Smartphones',
        brand: 'vivo',
        warna: ['red', 'gray'],
        isFeatured: false
      },
    ]
  });

  // OPPO Products
  await prisma.produk.createMany({
    data: [
      {
        nama: 'Reno 13',
        harga: 6499000,
        stok: 55,
        foto: '/v30.png',
        deskripsi: 'OPPO Reno 13 dengan layar AMOLED 6.7 inci, chipset MediaTek Dimensity 9200, dan sistem kamera pro untuk hasil foto profesional.',
        kategori: 'Smartphones',
        brand: 'oppo',
        warna: ['red', 'gray'],
        isFeatured: false
      },
      {
        nama: 'Oppo Watch',
        harga: 2799000,
        stok: 25,
        foto: '/watchgt.png',
        deskripsi: 'OPPO Watch dengan layar AMOLED fleksibel, sistem operasi Wear OS by Google, dan dukungan eSIM untuk konektivitas mandiri.',
        kategori: 'Wearables',
        brand: 'oppo',
        warna: ['black'],
        isFeatured: false
      },
      {
        nama: 'X2000',
        harga: 12999000,
        stok: 20,
        foto: '/y28.png',
        deskripsi: 'OPPO X2000 adalah flagship premium dengan Snapdragon 8 Gen 3, kamera Hasselblad, dan pengisian daya super cepat 100W.',
        kategori: 'Smartphones',
        brand: 'oppo',
        warna: ['purple', 'gray'],
        isFeatured: true
      },
      {
        nama: 'A3x',
        harga: 2199000,
        stok: 100,
        foto: '/y29.png',
        deskripsi: 'OPPO A3x dirancang untuk pengguna dinamis dengan baterai 5000mAh, layar besar 6.67 inci dan dual speaker stereo.',
        kategori: 'Smartphones',
        brand: 'oppo',
        warna: ['yellow', 'gray'],
        isFeatured: false
      },
      {
        nama: 'A60',
        harga: 2999000,
        stok: 80,
        foto: '/y18.png',
        deskripsi: 'OPPO A60 hadir dengan ketahanan air IP54, chipset Snapdragon 680, dan teknologi RAM expansion untuk multitasking lancar.',
        kategori: 'Smartphones',
        brand: 'oppo',
        warna: ['green', 'blue', 'black'],
        isFeatured: false
      },
    ]
  });

  // Samsung Products
  await prisma.produk.createMany({
    data: [
      {
        nama: 'Galaxy S24 Ultra',
        harga: 19999000,
        stok: 30,
        foto: '/v30.png',
        deskripsi: 'Samsung Galaxy S24 Ultra dengan S Pen terintegrasi, chipset Snapdragon 8 Gen 3, dan kamera 200MP untuk detail luar biasa.',
        kategori: 'Smartphones',
        brand: 'samsung',
        warna: ['black', 'purple', 'gray'],
        isFeatured: true
      },
      {
        nama: 'Galaxy Watch6',
        harga: 3799000,
        stok: 40,
        foto: '/watchgt.png',
        deskripsi: 'Samsung Galaxy Watch6 dengan fitur pemantauan kesehatan komprehensif, baterai tahan lama, dan desain premium yang nyaman dipakai sepanjang hari.',
        kategori: 'Wearables',
        brand: 'samsung',
        warna: ['black', 'silver'],
        isFeatured: false
      },
      {
        nama: 'Galaxy A54',
        harga: 5499000,
        stok: 65,
        foto: '/y28.png',
        deskripsi: 'Samsung Galaxy A54 dengan layar Super AMOLED 120Hz, chipset Exynos 1380, dan ketahanan IP67 terhadap air dan debu.',
        kategori: 'Smartphones',
        brand: 'samsung',
        warna: ['green', 'black', 'purple'],
        isFeatured: false
      },
      {
        nama: 'Galaxy Z Flip5',
        harga: 15999000,
        stok: 25,
        foto: '/y29.png',
        deskripsi: 'Samsung Galaxy Z Flip5 dengan layar lipat inovatif, cover display 3.4 inci, dan teknologi Flex Mode untuk penggunaan hands-free.',
        kategori: 'Smartphones',
        brand: 'samsung',
        warna: ['purple', 'black', 'green'],
        isFeatured: true
      },
      {
        nama: 'Galaxy Tab S9',
        harga: 9999000,
        stok: 35,
        foto: '/v30e.png',
        deskripsi: 'Samsung Galaxy Tab S9 dengan layar Dynamic AMOLED 2X, performa laptop-class dengan Snapdragon 8 Gen 2, dan S Pen dalam paket.',
        kategori: 'Tablets',
        brand: 'samsung',
        warna: ['gray', 'black'],
        isFeatured: false
      },
    ]
  });

  // iPhone Products
  await prisma.produk.createMany({
    data: [
      {
        nama: 'iPhone 15 Pro',
        harga: 19999000,
        stok: 40,
        foto: '/v30.png',
        deskripsi: 'iPhone 15 Pro dengan chip A17 Pro, kamera 48MP dengan Apple ProRAW, dan desain Titanium yang tahan lama dan ringan.',
        kategori: 'Smartphones',
        brand: 'iphone',
        warna: ['gray', 'blue', 'white'],
        isFeatured: true
      },
      {
        nama: 'Apple Watch SE',
        harga: 3499000,
        stok: 50,
        foto: '/watchgt.png',
        deskripsi: 'Apple Watch SE dengan fitur kesehatan esensial, deteksi kecelakaan, dan kemampuan pemantauan aktivitas yang komprehensif.',
        kategori: 'Wearables',
        brand: 'iphone',
        warna: ['black', 'pink', 'white'],
        isFeatured: false
      },
      {
        nama: 'iPhone 14',
        harga: 12999000,
        stok: 60,
        foto: '/y28.png',
        deskripsi: 'iPhone 14 dengan chip A15 Bionic, kamera depan 12MP dengan autofocus, dan kemampuan deteksi tabrakan untuk keamanan Anda.',
        kategori: 'Smartphones',
        brand: 'iphone',
        warna: ['blue', 'red', 'purple', 'yellow'],
        isFeatured: false
      },
      {
        nama: 'iPad Air',
        harga: 8999000,
        stok: 45,
        foto: '/y18.png',
        deskripsi: 'iPad Air dengan chip Apple M1, layar Liquid Retina 10.9 inci, dan dukungan Apple Pencil untuk kreativitas tanpa batas.',
        kategori: 'Tablets',
        brand: 'iphone',
        warna: ['blue', 'purple', 'gray'],
        isFeatured: false
      },
      {
        nama: 'AirPods Pro',
        harga: 3599000,
        stok: 70,
        foto: '/v30e.png',
        deskripsi: 'AirPods Pro dengan Active Noise Cancellation, Adaptive EQ, dan desain in-ear yang nyaman untuk penggunaan sepanjang hari.',
        kategori: 'Aksesoris',
        brand: 'iphone',
        warna: ['white'],
        isFeatured: false
      },
    ]
  });

  // Xiaomi Products
  await prisma.produk.createMany({
    data: [
      {
        nama: 'Xiaomi 13T Pro',
        harga: 9999000,
        stok: 35,
        foto: '/v30.png',
        deskripsi: 'Xiaomi 13T Pro dengan prosesor MediaTek Dimensity 9200+, kamera Leica 50MP, dan pengisian daya HyperCharge 120W.',
        kategori: 'Smartphones',
        brand: 'xiaomi',
        warna: ['blue', 'black', 'green'],
        isFeatured: true
      },
      {
        nama: 'Mi Band 8',
        harga: 599000,
        stok: 100,
        foto: '/watchgt.png',
        deskripsi: 'Mi Band 8 dengan layar AMOLED yang lebih besar, pemantauan kesehatan 24/7, dan daya tahan baterai hingga 21 hari.',
        kategori: 'Wearables',
        brand: 'xiaomi',
        warna: ['black', 'blue', 'red'],
        isFeatured: false
      },
      {
        nama: 'Redmi Note 12',
        harga: 2799000,
        stok: 120,
        foto: '/y28.png',
        deskripsi: 'Redmi Note 12 dengan layar AMOLED 120Hz, Snapdragon 685, dan pengisian cepat 33W untuk penggunaan sehari-hari.',
        kategori: 'Smartphones',
        brand: 'xiaomi',
        warna: ['green', 'blue', 'black'],
        isFeatured: false
      },
      {
        nama: 'POCO F5',
        harga: 5299000,
        stok: 55,
        foto: '/y29.png',
        deskripsi: 'POCO F5 dengan Snapdragon 7+ Gen 2, layar Flow AMOLED 120Hz, dan sistem pendingin LiquidCool 2.0 untuk gaming.',
        kategori: 'Smartphones',
        brand: 'xiaomi',
        warna: ['yellow', 'black', 'white'],
        isFeatured: false
      },
      {
        nama: 'Redmi Pad SE',
        harga: 2499000,
        stok: 40,
        foto: '/y18.png',
        deskripsi: 'Redmi Pad SE dengan layar 11 inci 90Hz, quad speaker dengan Dolby Atmos, dan baterai 8000mAh untuk hiburan sepanjang hari.',
        kategori: 'Tablets',
        brand: 'xiaomi',
        warna: ['gray', 'green'],
        isFeatured: false
      },
    ]
  });
  console.log('Seed data created successfully');
}


main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
