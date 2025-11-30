import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { Product } from "../lib/products";
import {
  LayoutDashboard,
  Shirt,
  LogOut,
  PlusCircle,
  Trash2,
  Pencil,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type View = "dashboard" | "products";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState<View>("dashboard");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [formData, setFormData] = useState<any>({
    name: "",
    price: "",
    description: "",
    category_id: "",
    sizes: []
  });

  const SIZES = ["S", "M", "L", "XL", "XXL"];

  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const data: any[] = [];
    snapshot.forEach(d =>
      data.push({
        id: d.id,
        ...d.data(),
        sizes: d.data().sizes || []
      })
    );
    setProducts(data);
    setCurrentPage(1);
  };

  const loadCategories = async () => {
    const snapshot = await getDocs(collection(db, "categories"));
    const data: any[] = [];
    snapshot.forEach(d => data.push({ id: d.id, ...d.data() }));
    setCategories(data);
  };

  const addCategory = async () => {
    if (!newCategory.trim()) return;
    await addDoc(collection(db, "categories"), {
      name: newCategory,
      slug: newCategory.toLowerCase().replace(/\s+/g, "-")
    });
    setNewCategory("");
    loadCategories();
  };

  const deleteCategory = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    await deleteDoc(doc(db, "categories", id));
    loadCategories();
  };

  const addProduct = async () => {
    await addDoc(collection(db, "products"), {
      ...formData,
      price: Number(formData.price),
      sizes: formData.sizes || [],
      image_url: "/V-cube-1-3-1.png",
      created_at: new Date().toISOString()
    });
    resetForm();
    loadProducts();
  };

  const updateProduct = async () => {
    if (!editingProduct) return;
    await updateDoc(doc(db, "products", editingProduct.id), {
      name: formData.name,
      description: formData.description,
      category_id: formData.category_id,
      price: Number(formData.price),
      sizes: formData.sizes || []
    });
    resetForm();
    loadProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!window.confirm("Delete product?")) return;
    await deleteDoc(doc(db, "products", id));
    loadProducts();
  };

  const resetForm = () => {
    setShowAddForm(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", description: "", category_id: "", sizes: [] });
  };

  const toggleSize = (size: string) => {
    setFormData((prev: any) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s: string) => s !== size)
        : [...prev.sizes, size]
    }));
  };

  // ✅ LOGOUT FIX
  const logout = async () => {
    await signOut(auth);
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex bg-gray-900 text-white">
      <aside className="w-72 bg-gradient-to-b from-black to-zinc-900 shadow-xl">
        <h1 className="text-2xl font-bold p-6">VCUBE Admin</h1>
        <nav className="space-y-2 px-4">
          <button
            onClick={() => setActiveView("dashboard")}
            className={`nav-btn ${activeView === "dashboard" && "active"}`}>
            <LayoutDashboard size={18}/> Dashboard
          </button>

          <button
            onClick={() => setActiveView("products")}
            className={`nav-btn ${activeView === "products" && "active"}`}>
            <Shirt size={18}/> Products
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-black/60 flex justify-between items-center p-6 border-b border-zinc-700">
          <h2 className="text-xl font-semibold capitalize">{activeView}</h2>
          <button onClick={logout} className="btn">
            <LogOut size={16}/> Logout
          </button>
        </header>

        {activeView === "dashboard" && (
          <section className="p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="card bg-orange-600">Products: {products.length}</div>
            <div className="card bg-blue-600">Categories: {categories.length}</div>
          </section>
        )}

        {activeView === "products" && (
          <section className="p-6">
            <div className="flex justify-between mb-6">
              <h2 className="text-2xl font-bold">Product Management</h2>
              <button onClick={() => setShowAddForm(true)} className="btn">
                <PlusCircle size={18}/> Add Product
              </button>
            </div>

            <div className="box">
              <input value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="New category"
                className="input" />
              <button onClick={addCategory} className="btn">Add Category</button>

              <div className="flex gap-2 flex-wrap">
                {categories.map(c => (
                  <div key={c.id} className="tag">
                    {c.name}
                    <button onClick={() => deleteCategory(c.id)} className="text-red-500">
                      <X size={12}/>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {showAddForm && (
              <div className="form">
                <input placeholder="Product Name"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name:e.target.value})}/>

                <input placeholder="Price"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price:e.target.value})}/>

                <select
                  value={formData.category_id}
                  onChange={e => setFormData({...formData, category_id:e.target.value})}>
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>

                <textarea rows={3} placeholder="Description" className="full"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description:e.target.value})}/>

                <div className="sizes">
                  {SIZES.map(size => (
                    <button key={size}
                      onClick={() => toggleSize(size)}
                      className={`size ${formData.sizes.includes(size) ? "active" : ""}`}>
                      {size}
                    </button>
                  ))}
                </div>

                <div className="btn-row">
                  <button onClick={editingProduct ? updateProduct : addProduct} className="btn green">
                    {editingProduct ? "Update" : "Add"}
                  </button>
                  <button onClick={resetForm} className="btn gray">Cancel</button>
                </div>
              </div>
            )}

            <div className="table-box">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Sizes</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map(p => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.category_id}</td>
                      <td>{p.sizes.length ? p.sizes.join(", ") : "-"}</td>
                      <td>₹ {p.price}</td>
                      <td className="flex gap-2">
                        <button className="bg-blue-600 p-2 rounded" onClick={() => {
                          setEditingProduct(p);
                          setFormData({
                            name: p.name || "",
                            price: p.price || "",
                            description: p.description || "",
                            category_id: p.category_id || "",
                            sizes: p.sizes || []
                          });
                          setShowAddForm(true);
                        }}>
                          <Pencil size={16}/>
                        </button>

                        <button className="bg-red-600 p-2 rounded" onClick={() => deleteProduct(p.id)}>
                          <Trash2 size={16}/>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                className="btn gray">Prev</button>

              <span className="pt-2">
                Page {currentPage} of {totalPages || 1}
              </span>

              <button disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                className="btn gray">Next</button>
            </div>

          </section>
        )}
      </main>
    </div>
  );
}
