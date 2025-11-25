import { MessageCircle, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src="/V-cube-1-3-1.png" alt="Vcube Logo" className="h-10 w-10" />
              <h3 className="text-2xl font-bold text-red-500">Vcube</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Premium quality men's wear for the modern gentleman. Style meets comfort.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Shop All Products
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Outfits
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Underwear
                </a>
              </li>
              <li>
                <a href="#products" className="text-gray-400 hover:text-white transition-colors">
                  Baniyans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-red-500">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="https://api.whatsapp.com/send/?phone=971548886200"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
                <span>+971 54 888 6200</span>
              </a>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail size={20} />
                <span>info@vcube.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin size={20} />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Vcube. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
