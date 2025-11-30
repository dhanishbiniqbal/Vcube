import { Menu, X, Search } from 'lucide-react'
import { useState } from 'react'

interface HeaderProps {
  onCategorySelect: (category: string) => void
  selectedCategory: string
  onSearch: (query: string) => void
}

export function Header({ onCategorySelect, selectedCategory, onSearch }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)

  const categories = [
    { name: 'Home', slug: 'all' },
    { name: 'Shop', slug: 'outfits' },
    { name: 'About', slug: 'underwear' },
    { name: 'Contact', slug: 'baniyans' },
  ]

  return (
    <header className="bg-black shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* TOP ROW */}
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <div className="flex items-center space-x-3">
            <img
              src="/V-cube-1-3-1.png"
              alt="Vcube Logo"
              className="h-14 w-auto object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-red-600">Vcube</h1>
              <p className="text-xs text-gray-400">Premium Men's Wear</p>
            </div>
          </div>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center space-x-6">

            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => onCategorySelect(cat.slug)}
                className={`text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? 'text-red-600 border-b-2 border-red-600 pb-1'
                    : 'text-gray-300 hover:text-red-500'
                }`}
              >
                {cat.name}
              </button>
            ))}

            {/* SEARCH BAR */}
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchText(value)
                  onSearch(value)
                }}
                className="pl-9 pr-4 py-2 text-sm rounded-full outline-none
                           bg-zinc-900 text-white border border-zinc-700
                           focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* DESKTOP MENU TOGGLE */}
            <div className="relative">
              <button
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-zinc-700 text-gray-200 hover:border-red-600 hover:text-white transition"
                onClick={() => setDesktopMenuOpen((prev) => !prev)}
              >
                <Menu size={18} />
                <span className="text-sm font-medium">Menu</span>
              </button>

              {desktopMenuOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-xl bg-zinc-900 border border-zinc-800 shadow-lg py-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => {
                        onCategorySelect(cat.slug)
                        setDesktopMenuOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        selectedCategory === cat.slug
                          ? 'text-white bg-red-600/80'
                          : 'text-gray-300 hover:bg-zinc-800'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </nav>

          {/* MOBILE ICON */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 bg-black">

            {/* MOBILE SEARCH */}
            <div className="relative px-4">
              <Search
                size={16}
                className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value
                  setSearchText(value)
                  onSearch(value)
                }}
                className="w-full pl-9 pr-4 py-2 text-sm rounded-full outline-none
                           bg-zinc-900 text-white border border-zinc-700
                           focus:ring-2 focus:ring-red-600 focus:border-red-600"
              />
            </div>

            {/* MOBILE CATEGORIES */}
            <nav className="flex flex-col space-y-1 px-4">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => {
                    onCategorySelect(cat.slug)
                    setMobileMenuOpen(false)
                  }}
                  className={`text-left px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-red-600 text-white font-medium'
                      : 'text-gray-300 hover:bg-zinc-800'
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
  )
}
