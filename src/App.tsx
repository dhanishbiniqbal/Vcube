import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { db } from './firebase.ts';
import { collection, getDocs } from 'firebase/firestore';
import { Product } from './lib/products';

import Login from "./pages/Login.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import ProtectedRoute from "./auth/ProtectedRoute.tsx";

function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProductsFromFirestore();
  }, []);

  const loadProductsFromFirestore = async () => {
    try {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "products"));
      const firestoreProducts: Product[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        firestoreProducts.push({
          id: doc.id,
          name: data.name,
          description: data.description,
          price: data.price,
          category_id: data.category_id,
          image_url: data.image_url,
          sizes: data.sizes || [],
          colors: data.colors || [],
          featured: data.featured || false,
          created_at: data.created_at,
        } as Product);
      });
      
      console.log("✅ Loaded products from Firestore:", firestoreProducts);
      setProducts(firestoreProducts);
      setFilteredProducts(firestoreProducts);
    } catch (error) {
      console.error("❌ Failed to load products from Firestore:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((p) => p.category_id === selectedCategory);
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
      <Hero />
      
      <section id="products" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">Our Products</h2>
          <p className="text-xl text-gray-600 mt-2">Premium quality clothes for every occasion</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <p className="text-gray-500">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-200">
                  <img 
                    src={p.image_url} 
                    alt={p.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-4">
                  {p.featured && (
                    <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                      Featured
                    </span>
                  )}
                  <h3 className="font-bold text-gray-900 line-clamp-2">{p.name}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mt-1">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-red-600 font-bold text-lg">AED {p.price}</p>
                    <button onClick={() => setSelectedProduct(p)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition">
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}
      </section>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}

      <Footer />
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
