import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { products as staticProducts, Product } from './lib/products';

import Login from "./pages/Login.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

function HomePage() {
  const [products, setProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem("vcube_products");
      if (savedProducts) {
        const loadedProducts = JSON.parse(savedProducts);
        if (Array.isArray(loadedProducts) && loadedProducts.length > 0) {
          setProducts(loadedProducts);
          return;
        }
      }
      setProducts(staticProducts);
    } catch (error) {
      console.error("❌ Error loading products:", error);
      localStorage.removeItem("vcube_products");
      setProducts(staticProducts);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-red-600">Vcube</h1>
          <p className="text-gray-600">Premium Men's Wear</p>
        </div>
      </header>
      
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8">Our Products ({products.length})</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p.id} className="bg-white rounded-lg shadow p-4">
              <img 
                src={p.image_url} 
                alt={p.name}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h3 className="font-bold">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.category_id}</p>
              <p className="text-red-600 font-bold mt-2">AED {p.price}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Vcube. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
