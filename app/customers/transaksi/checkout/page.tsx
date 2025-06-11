'use client'; // This marks the component as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaShippingFast, FaCreditCard, FaMoneyBillWave, FaMapMarkerAlt, FaCheck } from 'react-icons/fa';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingCost, setShippingCost] = useState(20000);
  const [paymentMethod, setPaymentMethod] = useState('QRIS');
  const [showCardForm, setShowCardForm] = useState(false);
  
  // Card payment form state
  const [cardInfo, setCardInfo] = useState({
    firstName: '',
    lastName: '',
    cardNumber: '',
    cvv: '',
    expMonth: '',
    expYear: ''
  });

  // Address information - this could be fetched from user profile
  const addressInfo = {
    name: 'Pelanggan (+62) 8123456789',
    address: 'Jl. Colombo No.1, Karang Jl. Contoh Alamat No. 123, Caturtunggal, Kec. Depok, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55281',
    shippingMethod: 'JNT'
  };

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Filter only selected items for checkout
      const selectedItems = cart.filter(item => item.selected);
      
      // If no selected items, create a sample item
      if (selectedItems.length === 0) {
        const sampleItem = {
          id: 'y2888',
          name: 'VIVO Y28',
          color: 'BLACK',
          storage: '8/128',
          price: 2499000,
          quantity: 1,
          image: '/y28.png',
          selected: true
        };
        setCartItems([sampleItem]);
      } else {
        setCartItems(selectedItems);
      }
    };
    
    loadCartItems();
  }, []);

  // Calculate total price whenever cart items change
  useEffect(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(subtotal + shippingCost);
  }, [cartItems, shippingCost]);

  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    setShowCardForm(method === 'DEBIT/KREDIT');
  };

  // Handle card form input changes
  const handleCardInfoChange = (e) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value
    });
  };

  // Handle order submission
  const handlePlaceOrder = () => {
    // In a real app, you would process the payment and submit the order
    alert('Pesanan Anda telah dibuat! Terima kasih.');
    router.push('/order-confirmation');
  };

  // Format price with thousand separators
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  // Get subtotal (total before shipping)
  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-8">
      <div className="max-w-4xl mx-auto p-4">
        <div className="mb-6 flex items-center">
          <Link href="/customers/transaksi/cart" className="flex items-center text-purple-600 hover:text-purple-800 transition-colors">
            <FaArrowLeft className="mr-2" />
            <span className="font-medium">Kembali ke Keranjang</span>
          </Link>
          <h1 className="text-2xl font-bold text-center flex-grow text-gray-800">Checkout</h1>
        </div>

        {/* Checkout Summary - Fixed on top right for desktop */}
        <div className="lg:flex gap-6">
          {/* Main checkout content */}
          <div className="lg:w-2/3 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#A91D92] to-[#d33bbc] px-6 py-4 flex items-center">
                <FaMapMarkerAlt className="text-white mr-3 text-xl" />
                <h2 className="text-lg font-bold text-white">Alamat Pengiriman</h2>
              </div>
              
              <div className="p-6">
                <div className="mb-4 bg-purple-50 p-4 rounded-lg border-l-4 border-[#A91D92]">
                  <div className="text-lg font-bold text-gray-800">{addressInfo.name}</div>
                  <div className="text-gray-700 mt-1">{addressInfo.address}</div>
                </div>
                
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-white p-2 rounded-md shadow-sm mr-3">
                      <Image src="/jnt-logo.png" alt="JNT" width={32} height={32} />
                    </div>
                    <div>
                      <span className="text-gray-600 block">Opsi Pengiriman:</span>
                      <span className="font-medium text-gray-800">{addressInfo.shippingMethod} Express</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium text-[#A91D92]">Rp {formatPrice(shippingCost)}</span>
                    <button className="mt-2 bg-purple-100 text-[#A91D92] px-4 py-1 rounded-md font-medium hover:bg-purple-200 transition-colors">
                      UBAH
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#A91D92] to-[#d33bbc] px-6 py-4 flex items-center">
                <FaShippingFast className="text-white mr-3 text-xl" />
                <h2 className="text-lg font-bold text-white">Produk Dipesan</h2>
              </div>
              
              <div className="p-6">
                {cartItems.map((item, index) => (
                  <div key={item.id} className={`flex flex-col sm:flex-row sm:items-center py-4 ${index < cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
                    <div className="flex items-center mb-4 sm:mb-0 sm:flex-1">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 w-20 h-20 mr-4 flex items-center justify-center">
                        <div className="relative w-full h-full">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{item.name}</div>
                        <div className="text-sm text-gray-500">Variasi: {item.color} {item.storage}</div>
                        <div className="text-[#A91D92] font-medium mt-1">Rp {formatPrice(item.price)}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center mr-8">
                        <span className="text-gray-600 mr-2">Jumlah:</span>
                        <span className="bg-purple-100 text-[#A91D92] font-medium px-3 py-1 rounded">{item.quantity}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-gray-600 text-sm">Subtotal:</div>
                        <div className="font-bold text-[#A91D92]">Rp {formatPrice(item.price * item.quantity)}</div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-gray-800">
                  <span className="font-medium">Subtotal</span>
                  <span className="font-bold">Rp {formatPrice(getSubtotal())}</span>
                </div>
                <div className="mt-2 flex justify-between text-gray-800">
                  <span className="font-medium">Biaya Pengiriman</span>
                  <span className="font-bold">Rp {formatPrice(shippingCost)}</span>
                </div>
              </div>
            </div>

            {/* Payment method */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-[#A91D92] to-[#d33bbc] px-6 py-4 flex items-center">
                <FaCreditCard className="text-white mr-3 text-xl" />
                <h2 className="text-lg font-bold text-white">Metode Pembayaran</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className={`flex items-center p-4 border rounded-lg ${paymentMethod === 'QRIS' ? 'border-[#A91D92] bg-purple-50' : 'border-gray-200'}`}>
                    <input 
                      type="radio" 
                      id="qris" 
                      name="payment" 
                      value="QRIS"
                      checked={paymentMethod === 'QRIS'}
                      onChange={() => handlePaymentMethodChange('QRIS')}
                      className="w-5 h-5 accent-[#A91D92] mr-3" 
                    />
                    <label htmlFor="qris" className="font-medium flex-1">QRIS</label>
                    <Image src="/QRIS.png" alt="QRIS" width={110} height={25} />
                  </div>
                  
                  <div className={`flex items-center p-4 border rounded-lg ${paymentMethod === 'DEBIT/KREDIT' ? 'border-[#A91D92] bg-purple-50' : 'border-gray-200'}`}>
                    <input 
                      type="radio" 
                      id="debit-credit" 
                      name="payment" 
                      value="DEBIT/KREDIT"
                      checked={paymentMethod === 'DEBIT/KREDIT'}
                      onChange={() => handlePaymentMethodChange('DEBIT/KREDIT')}
                      className="w-5 h-5 accent-[#A91D92] mr-3" 
                    />
                    <label htmlFor="debit-credit" className="font-medium flex-1">DEBIT/KREDIT</label>
                    <Image src="/visa.png" alt="Visa" width={70} height={25} />
                  </div>
                  
                  {showCardForm && (
                    <div className="mt-4 p-6 border border-[#A91D92] rounded-lg bg-purple-50 animate-fadeIn">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-700">Nama Depan</label>
                          <input 
                            type="text" 
                            name="firstName"
                            value={cardInfo.firstName}
                            onChange={handleCardInfoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-700">Nama Belakang</label>
                          <input 
                            type="text" 
                            name="lastName"
                            value={cardInfo.lastName}
                            onChange={handleCardInfoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-700">Nomor Kartu</label>
                          <input 
                            type="text" 
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={handleCardInfoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                            placeholder="XXXX XXXX XXXX XXXX"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-gray-700">CVV</label>
                          <input 
                            type="text" 
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCardInfoChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                            placeholder="XXX"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-sm font-medium mb-1 text-gray-700">Valid Sampai</label>
                          <div className="grid grid-cols-2 gap-4">
                            <input 
                              type="text" 
                              name="expMonth"
                              value={cardInfo.expMonth}
                              onChange={handleCardInfoChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                              placeholder="Bulan"
                            />
                            <input 
                              type="text" 
                              name="expYear"
                              value={cardInfo.expYear}
                              onChange={handleCardInfoChange}
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A91D92] focus:border-transparent outline-none"
                              placeholder="Tahun"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order summary sidebar */}
          <div className="lg:w-1/3 mt-6 lg:mt-0">
            <div className="bg-white rounded-xl shadow-lg sticky top-6">
              <div className="bg-gradient-to-r from-[#A91D92] to-[#d33bbc] px-6 py-4">
                <h2 className="text-lg font-bold text-white">Ringkasan Pesanan</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jumlah Produk</span>
                    <span className="font-medium">{cartItems.length} item</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">Rp {formatPrice(getSubtotal())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Biaya Pengiriman</span>
                    <span className="font-medium">Rp {formatPrice(shippingCost)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-xl font-bold text-[#A91D92]">Rp {formatPrice(totalPrice)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button 
                    className="w-full bg-[#A91D92] text-white py-4 rounded-lg font-bold hover:bg-[#8a1677] transition-colors flex items-center justify-center"
                    onClick={handlePlaceOrder}
                  >
                    <FaCheck className="mr-2" />
                    BUAT PESANAN
                  </button>
                  <Link 
                    href= "/customers/transaksi/cart" 
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <FaArrowLeft className="mr-2" />
                    KEMBALI
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}