import { X, MessageCircle } from 'lucide-react';
import { Product } from '../lib/products';
import { useState } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState("");

  const handleWhatsAppInquiry = () => {
    const message =
      `Hi! I'm interested in your product:\n\n` +
      `Product: ${product.name}\n` +
      `Price: AED ${product.price}\n` +
      (selectedSize ? `Size: ${selectedSize}\n` : "") +
      `\nPlease send more details.`;

    // ✅ WORKS EVEN IF POPUP BLOCKED
    const link = document.createElement("a");
    link.href = `https://wa.me/971548886200?text=${encodeURIComponent(message)}`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex justify-center items-center">
      <div className="bg-white text-black rounded-xl w-full max-w-4xl p-6 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <X />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* IMAGE */}
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />

          {/* PRODUCT INFO */}
          <div>
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {product.description}
            </p>

            <p className="mt-6 text-2xl text-red-600 font-bold">
              AED {product.price}
            </p>

            {/* SIZE SELECT */}
            {product.sizes?.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold">Select size</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border rounded px-3 py-1 transition ${
                        selectedSize === size
                          ? "bg-red-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* WHATSAPP BUTTON */}
            <button
              onClick={handleWhatsAppInquiry}
              className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg flex justify-center items-center gap-2"
            >
              <MessageCircle />
              Inquire on WhatsApp
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
