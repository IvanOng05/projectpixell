// app/hooks/productHooks.js
"use client";
import { useState, useEffect } from 'react';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/customers/products');
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Server response:', errorText); // Log raw response
          throw new Error(`Failed to fetch products: ${response.status} - ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err.message, err.stack);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}