import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCartStore } from '../../stores/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }
    
    addToCart(product, 1);
    toast.success('Producto añadido al carrito');
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {(product.isNew || product.is_new) && (
          <div className="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded">
            Nuevo
          </div>
        )}
        
        {product.stock <= 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Agotado
          </div>
        )}
        
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button 
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            onClick={(e) => e.preventDefault()}
          >
            <Heart className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`p-2 rounded-full transition-colors ${
              product.stock > 0
                ? 'bg-black hover:bg-pink-600 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
        
        <div className="mt-2 text-sm">
          {product.stock > 0 ? (
            <span className="text-green-600">En stock ({product.stock})</span>
          ) : (
            <span className="text-red-600">Agotado</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;