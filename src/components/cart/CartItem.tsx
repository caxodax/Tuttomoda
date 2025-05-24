import React from 'react';
import { Trash, Minus, Plus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCartStore } from '../../stores/cartStore';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore();
  
  return (
    <div className="flex flex-col sm:flex-row border-b border-gray-200 py-4">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0">
        <img 
          src={item.product.images[0]} 
          alt={item.product.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-1 sm:ml-6">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{item.product.name}</h3>
            <div className="mt-1 text-sm text-gray-600">
              {item.selectedSize && <span className="mr-3">Talla: {item.selectedSize}</span>}
              {item.selectedColor && <span>Color: {item.selectedColor}</span>}
            </div>
            <div className="mt-1 font-medium">${item.product.price.toFixed(2)}</div>
          </div>
          
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="flex items-center border border-gray-300 rounded">
              <button 
                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
                className="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50"
              >
                <Minus className="h-4 w-4" />
              </button>
              
              <span className="w-10 text-center">{item.quantity}</span>
              
              <button 
                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            
            <button 
              onClick={() => removeFromCart(item.product.id)}
              className="ml-4 text-gray-600 hover:text-red-600"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-2 sm:mt-4 font-bold text-right">
          Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItem;