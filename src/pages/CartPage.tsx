import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import CartItem from '../components/cart/CartItem';

const CartPage: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <h1 className="text-3xl font-bold mb-6">Carrito de Compras</h1>
      
      {items.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4 pb-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold">Productos</h2>
                <button 
                  onClick={() => clearCart()}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Vaciar carrito
                </button>
              </div>
              
              <div>
                {items.map((item, index) => (
                  <CartItem key={`${item.product.id}-${index}`} item={item} />
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-4 pb-4 border-b border-gray-200">Resumen del Pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-medium">Calculado al finalizar</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                
                <Link
                  to="/checkout"
                  className="block w-full bg-pink-600 hover:bg-pink-700 text-white text-center font-medium py-3 px-4 rounded-md transition-colors mt-6"
                >
                  Proceder al pago
                </Link>
                
                <Link
                  to="/"
                  className="block w-full text-center text-gray-600 hover:text-gray-900 mt-4 flex items-center justify-center"
                >
                  <ArrowRight className="h-4 w-4 mr-2 transform rotate-180" />
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <ShoppingBag className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Parece que aún no has añadido productos a tu carrito.</p>
          <Link
            to="/"
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-8 rounded-md transition-colors"
          >
            Comenzar a comprar
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;