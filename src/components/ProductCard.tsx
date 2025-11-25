import { Product } from '../lib/products';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.featured && (
          <span className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-red-600">
              AED {product.price.toFixed(2)}
            </span>
          </div>
          <button
            className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
        {product.sizes.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs border border-gray-300 px-2 py-1 rounded"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-gray-500">+{product.sizes.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
