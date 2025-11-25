import { X, MessageCircle } from 'lucide-react';
import { Product } from '../lib/products';
import { useState } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in:\n\nProduct: ${product.name}\nPrice: AED ${product.price.toFixed(2)}${selectedSize ? `\nSize: ${selectedSize}` : ''}${selectedColor ? `\nColor: ${selectedColor}` : ''}\n\nCould you provide more details?`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=971548886200&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-75"
          onClick={onClose}
        ></div>

        <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
              {product.featured && (
                <span className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Featured
                </span>
              )}
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-red-600">
                    AED {product.price.toFixed(2)}
                  </span>
                </div>

                {product.sizes.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Size
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                            selectedSize === size
                              ? 'border-red-600 bg-red-50 text-red-600'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors.length > 0 && (
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Select Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                            selectedColor === color
                              ? 'border-red-600 bg-red-50 text-red-600'
                              : 'border-gray-300 hover:border-red-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleWhatsAppInquiry}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold hover:bg-red-700 transition-all flex items-center justify-center space-x-2 transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={24} />
                <span>Inquire on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
