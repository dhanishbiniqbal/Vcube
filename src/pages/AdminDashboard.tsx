import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.ts";
import { products as initialProducts, Product } from "../lib/products";
import {
  LogOut,
  Plus,
  Trash2,
  Edit2,
  TrendingUp,
  Package,
  DollarSign,
  Users,
} from "lucide-react";

type DashboardView = "overview" | "products" | "analytics" | "settings";

interface DashboardStats {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  totalCustomers: number;
}

export default function AdminDashboard() {
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    category_id: "shirts",
    image_url: "",
    sizes: [],
    colors: [],
    featured: false,
  });

  // Load products from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem("vcube_products");
    if (savedProducts) {
      try {
        setProducts(JSON.parse(savedProducts));
      } catch (error) {
        console.error("Failed to load products from localStorage:", error);
      }
    }
  }, []);

  const logout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSizesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizes = e.target.value.split(",").map((s) => s.trim());
    setFormData((prev) => ({ ...prev, sizes }));
  };

  const handleColorsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colors = e.target.value.split(",").map((c) => c.trim());
    setFormData((prev) => ({ ...prev, colors }));
  };

  const handleAddProduct = () => {
    if (!formData.name || !formData.description || !formData.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const newProduct: Product = {
        id: `p${Date.now()}`,
        name: formData.name || "",
        description: formData.description || "",
        price: Number(formData.price) || 0,
        category_id: formData.category_id || "shirts",
        image_url: formData.image_url || "/V-cube-1-3-1.png",
        sizes: Array.isArray(formData.sizes) ? formData.sizes : [],
        colors: Array.isArray(formData.colors) ? formData.colors : [],
        featured: Boolean(formData.featured) || false,
        created_at: new Date().toISOString(),
      };

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      const jsonData = JSON.stringify(updatedProducts);
      console.log("💾 Saving to localStorage:", jsonData);
      localStorage.setItem("vcube_products", jsonData);
      console.log("✅ Product saved! Total products:", updatedProducts.length);
      console.log("📍 New product:", newProduct);
      resetForm();
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    try {
      const updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...editingProduct,
              ...formData,
            }
          : p
      ) as Product[];
      setProducts(updatedProducts);
      localStorage.setItem("vcube_products", JSON.stringify(updatedProducts));
      resetForm();
      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowAddForm(true);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const updatedProducts = products.filter((p) => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("vcube_products", JSON.stringify(updatedProducts));
        alert("Product deleted successfully!");
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product. Please try again.");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category_id: "shirts",
      image_url: "",
      sizes: [],
      colors: [],
      featured: false,
    });
    setEditingProduct(null);
    setShowAddForm(false);
  };

  const calculateStats = (): DashboardStats => {
    return {
      totalProducts: products.length,
      totalRevenue: products.reduce((sum, p) => sum + p.price, 0),
      totalOrders: Math.floor(Math.random() * 500) + 100,
      totalCustomers: Math.floor(Math.random() * 1000) + 500,
    };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-300">Manage your menswear store</p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-lg">
          <nav className="p-6 space-y-2">
            {[
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "products", label: "Products", icon: Package },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "settings", label: "Settings", icon: Users },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveView(id as DashboardView)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeView === id
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Overview Section */}
          {activeView === "overview" && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Dashboard Overview</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Package size={24} />
                  </div>
                  <p className="text-gray-500 text-sm">Total Products</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalProducts}</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <DollarSign size={24} />
                  </div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold mt-2">${stats.totalRevenue}</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="bg-purple-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp size={24} />
                  </div>
                  <p className="text-gray-500 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalOrders}</p>
                </div>
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="bg-orange-500 text-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <p className="text-gray-500 text-sm">Total Customers</p>
                  <p className="text-3xl font-bold mt-2">{stats.totalCustomers}</p>
                </div>
              </div>

              {/* Recent Products */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Recent Products</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.slice(0, 6).map((product) => (
                    <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h4 className="font-bold text-sm">{product.name}</h4>
                      <p className="text-red-600 font-bold">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.category_id}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Management Section */}
          {activeView === "products" && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Product Management</h2>
                {!showAddForm && (
                  <button
                    onClick={() => {
                      setShowAddForm(true);
                      setEditingProduct(null);
                    }}
                    className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                  >
                    <Plus size={20} />
                    Add Product
                  </button>
                )}
              </div>

              {/* Add/Edit Form */}
              {showAddForm && (
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                  <h3 className="text-xl font-bold mb-6">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name || ""}
                        onChange={handleInputChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price || 0}
                        onChange={handleInputChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <select
                        name="category_id"
                        value={formData.category_id || "shirts"}
                        onChange={handleInputChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="shirts">Shirts</option>
                        <option value="pants">Pants</option>
                        <option value="jackets">Jackets</option>
                        <option value="accessories">Accessories</option>
                      </select>
                      <input
                        type="text"
                        name="image_url"
                        placeholder="Image URL"
                        value={formData.image_url || ""}
                        onChange={handleInputChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <textarea
                      name="description"
                      placeholder="Product Description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      rows={3}
                      className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Sizes (comma-separated, e.g., S,M,L,XL)"
                        value={formData.sizes?.join(", ") || ""}
                        onChange={handleSizesChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      />
                      <input
                        type="text"
                        placeholder="Colors (comma-separated, e.g., Red,Blue,Black)"
                        value={formData.colors?.join(", ") || ""}
                        onChange={handleColorsChange}
                        className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>

                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="featured"
                        checked={formData.featured || false}
                        onChange={handleInputChange}
                        className="w-4 h-4 cursor-pointer"
                      />
                      <span>Mark as Featured</span>
                    </label>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
                      >
                        {editingProduct ? "Update Product" : "Add Product"}
                      </button>
                      <button
                        type="button"
                        onClick={resetForm}
                        className="bg-gray-300 text-black px-6 py-2 rounded-lg hover:bg-gray-400 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products Table */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-bold">Product Name</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Category</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Price</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Sizes</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Colors</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Featured</th>
                        <th className="px-6 py-3 text-left text-sm font-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm font-medium">{product.name}</td>
                          <td className="px-6 py-4 text-sm capitalize">{product.category_id}</td>
                          <td className="px-6 py-4 text-sm text-red-600 font-bold">${product.price}</td>
                          <td className="px-6 py-4 text-sm">{product.sizes.join(", ")}</td>
                          <td className="px-6 py-4 text-sm">{product.colors.join(", ")}</td>
                          <td className="px-6 py-4 text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                product.featured
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {product.featured ? "Yes" : "No"}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm flex gap-2">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeView === "analytics" && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Analytics</h2>
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold mb-4">Sales Performance</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                        <p className="text-sm opacity-90">This Week</p>
                        <p className="text-2xl font-bold">$2,450</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-4 rounded-lg">
                        <p className="text-sm opacity-90">This Month</p>
                        <p className="text-2xl font-bold">$10,200</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                        <p className="text-sm opacity-90">Best Seller</p>
                        <p className="text-2xl font-bold">{products[0]?.name}</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-4 rounded-lg">
                        <p className="text-sm opacity-90">Avg. Order</p>
                        <p className="text-2xl font-bold">$185</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold mb-4">Product Categories</h3>
                    <div className="space-y-3">
                      {["Shirts", "Pants", "Jackets", "Accessories"].map((category) => {
                        const count = products.filter(
                          (p) => p.category_id === category.toLowerCase()
                        ).length;
                        return (
                          <div key={category}>
                            <div className="flex justify-between mb-1">
                              <span className="font-medium">{category}</span>
                              <span>{count} products</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-black h-2 rounded-full"
                                style={{ width: `${(count / products.length) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeView === "settings" && (
            <div>
              <h2 className="text-2xl font-bold mb-8">Settings</h2>
              <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Store Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Store Name</label>
                      <input
                        type="text"
                        placeholder="V-Cube Menswear"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Store Email</label>
                      <input
                        type="email"
                        placeholder="admin@vcube.com"
                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Currency</label>
                      <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold mb-4">System Settings</h3>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span>Enable notifications</span>
                  </label>
                  <label className="flex items-center gap-2 mt-3">
                    <input type="checkbox" className="w-4 h-4" defaultChecked />
                    <span>Enable email alerts</span>
                  </label>
                </div>

                <div className="border-t pt-6">
                  <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition">
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
