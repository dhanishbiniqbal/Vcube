import { ShoppingBag } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-red-600 to-red-800 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <div className="flex items-center space-x-2 mb-6">
            <ShoppingBag size={40} className="text-white" />
            <span className="text-xl font-semibold">Premium Quality</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Elevate Your Style with Vcube
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-red-50">
            Discover premium men's wear - from stylish outfits to comfortable essentials.
            Quality you can feel, style you can see.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#products"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold hover:bg-red-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </a>
            <a
              href="https://api.whatsapp.com/send/?phone=971548886200"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-red-600 transition-all transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
}
