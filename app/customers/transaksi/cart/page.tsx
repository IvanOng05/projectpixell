'use client'; // This marks the component as a Client Component

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCount, setSelectedCount] = useState(0);
  const [selectAll, setSelectAll] = useState(true);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCartItems = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // If cart is empty, we'll create sample items for display
      if (cart.length === 0) {
        const sampleItem = {
          id: 'y288',
          name: 'VIVO Y28',
          color: 'BLACK',
          storage: '8/128',
          price: 2499000,
          quantity: 1,
          image: '/y28.png',
          selected: true
        };
        // Create three identical items for demo
        const sampleCart = [
          {...sampleItem, id: 'y28-1', selected: true},
          {...sampleItem, id: 'y28-2', selected: false},
          {...sampleItem, id: 'y28-3', selected: false}
        ];
        localStorage.setItem('cart', JSON.stringify(sampleCart));
        setCartItems(sampleCart);
      } else {
        setCartItems(cart);
      }
    };
    
    loadCartItems();
  }, []);

  // Calculate total price and selected count whenever cart items change
  useEffect(() => {
    const total = cartItems
      .filter(item => item.selected)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const selected = cartItems.filter(item => item.selected).length;
    
    setTotalPrice(total);
    setSelectedCount(selected);
    setSelectAll(selected === cartItems.length && cartItems.length > 0);
  }, [cartItems]);

  // Toggle item selection
  const toggleItemSelection = (id) => {
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Toggle select all
  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    const updatedCart = cartItems.map(item => ({ ...item, selected: newSelectAll }));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update quantity
  const updateQuantity = (id, increment) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Delete selected items
  const deleteSelectedItems = () => {
    const updatedCart = cartItems.filter(item => !item.selected);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Process checkout
  const handleCheckout = () => {
    if (selectedCount > 0) {
      router.push('/customers/transaksi/checkout');
    }
  };

  // Format price with thousand separators
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-4" key="cart-container">
        {/* Header */}
        <div className="grid grid-cols-12 gap-2 py-2 border-b border-gray-200 text-gray-700" key="cart-header">
          <div className="col-span-6 flex items-center">
            <input 
              type="checkbox" 
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-2 w-5 h-5 accent-purple-600"
            />
            <span className="font-medium">Produk</span>
          </div>
          <div className="col-span-2 text-center font-medium">Harga Satuan</div>
          <div className="col-span-2 text-center font-medium">QTY</div>
          <div className="col-span-2 text-center font-medium">Total Harga</div>
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-gray-500" key="empty-cart">
            Keranjang belanja Anda kosong.
          </div>
        ) : (
          <div key="cart-items-container">
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 py-4 border-b border-gray-200">
                <div className="col-span-6 flex items-center">
                  <input 
                    type="checkbox" 
                    checked={item.selected}
                    onChange={() => toggleItemSelection(item.id)}
                    className="mr-2 w-5 h-5 accent-purple-600"
                  />
                  <div className="flex items-center">
                    <div className="border border-gray-200 rounded-lg p-2 w-20 h-20 mr-4">
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
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">Variasi: {item.color} {item.storage}</p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {formatPrice(item.price)}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <button 
                    className="bg-[#A91D92] text-white w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={() => updateQuantity(item.id, false)}
                  >
                    <FaMinus size={12} />
                  </button>
                  <span className="mx-4 text-lg">{item.quantity}</span>
                  <button 
                    className="bg-[#A91D92] text-white w-8 h-8 flex items-center justify-center rounded-full"
                    onClick={() => updateQuantity(item.id, true)}
                  >
                    <FaPlus size={12} />
                  </button>
                </div>
                <div className="col-span-2 flex items-center justify-between">
                  <span className="text-purple-600 font-medium">{formatPrice(item.price * item.quantity)}</span>
                  <button 
                    className="text-purple-600 font-medium bg-purple-100 px-4 py-2 rounded-md hover:bg-purple-200"
                    onClick={() => removeItem(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 flex justify-between items-center" key="cart-footer">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={selectAll}
              onChange={toggleSelectAll}
              className="mr-2 w-5 h-5 accent-purple-600"
            />
            <span className="mr-4">PILIH SEMUA ({cartItems.length})</span>
            <button 
              className="text-gray-700"
              onClick={deleteSelectedItems}
            >
              HAPUS
            </button>
          </div>
          <div className="flex items-center">
            <div className="mr-4 text-right">
              <div className="text-gray-700">TOTAL ({selectedCount}) Produk</div>
              <div className="text-2xl font-bold text-purple-600">{formatPrice(totalPrice)}</div>
            </div>
            <button 
              className={`px-8 py-3 rounded-md font-medium ${
                selectedCount > 0 
                  ? 'bg-purple-600 text-white hover:bg-purple-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              onClick={handleCheckout}
              disabled={selectedCount === 0}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}