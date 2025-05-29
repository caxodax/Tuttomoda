import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/cartStore';
import { ShippingDetails } from '../../types';
import { sendOrderToWhatsApp } from '../../utils/whatsapp';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingDetails(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Send order to WhatsApp
    const total = getTotalPrice();
    sendOrderToWhatsApp(items, shippingDetails, total);
    
    // Clear cart and redirect
    clearCart();
    navigate('/');
    
    // In a real application, you would also save the order to your database
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Información de envío</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre completo*
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico*
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono*
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Ciudad*
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={shippingDetails.city}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Dirección*
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={shippingDetails.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
              Código postal
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            />
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              Notas adicionales
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              value={shippingDetails.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <button
          type="submit"
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          Confirmar Pedido vía WhatsApp
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Al confirmar, serás redirigido a WhatsApp para finalizar tu pedido.
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;