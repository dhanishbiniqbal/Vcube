import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}

export function Header({ onCategorySelect, selectedCategory }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { name: 'All Products', slug: 'all' },
    { name: 'Outfits', slug: 'outfits' },
    { name: 'Underwear', slug: 'underwear' },
    { name: 'Baniyans', slug: 'baniyans' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <img src="/V-cube-1-3-1.png" alt="Vcube Logo" className="h-12 w-12" />
            <div>
              <h1 className="text-2xl font-bold text-red-600">Vcube</h1>
              <p className="text-xs text-gray-600">Premium Men's Wear</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onCategorySelect(cat.slug)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onCategorySelect(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-red-50 text-red-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
