"use client";
import { useState, useEffect } from 'react';

// Custom hook untuk fetch data produk dari API
export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/customers/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}

// Custom hook untuk fetch produk unggulan
export function useFeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const response = await fetch('/api/customers/products/featured');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured products');
        }
        
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  return { featuredProducts, loading, error };
}

// Custom hook untuk fetch produk berdasarkan brand
export function useProductsByBrand(brand) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsByBrand() {
      if (!brand) return;
      
      try {
        const response = await fetch(`/api/customers/products?brand=${brand}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch ${brand} products`);
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error(`Error fetching ${brand} products:`, err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByBrand();
  }, [brand]);

  return { products, loading, error };
}

// Custom hook untuk mendapatkan detail produk
export function useProductDetail(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductDetail() {
      if (!productId) return;
      
      try {
        const response = await fetch(`/api/customers/products/${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProductDetail();
  }, [productId]);

  return { product, loading, error };
}