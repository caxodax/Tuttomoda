import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useSiteSettings } from '../../hooks/useSupabase';
import { ShippingDetails } from '../../types';
import { sendOrderToWhatsApp } from '../../utils/whatsapp';
import { sendOrderEmail } from '../../utils/emailService';
import { generateOrderCode } from '../../utils/orderUtils';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const CheckoutForm: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { settings } = useSiteSettings();
  const [isProcessing, setIsProcessing] = useState(false);
  
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
  
  const updateProductStock = async () => {
    try {
      for (const item of items) {
        const newStock = item.product.stock - item.quantity;
        
        const { error } = await supabase
          .from('products')
          .update({ stock: Math.max(0, newStock) })
          .eq('id', item.product.id);
        
        if (error) throw error;
      }
      return true;
    } catch (error) {
      console.error('Error updating stock:', error);
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Generate order code
      const orderCode = generateOrderCode();
      const total = getTotalPrice();
      
      // Update stock for all products
      const stockUpdated = await updateProductStock();
      if (!stockUpdated) {
        throw new Error('Error al actualizar el inventario');
      }
      
      // Send email notification (in background)
      sendOrderEmail(orderCode, items, shippingDetails, total)
        .then((success) => {
          if (success) {
            console.log('Email sent successfully');
          } else {
            console.log('Email sending failed');
          }
        });
      
      // Send WhatsApp message
      if (settings?.whatsapp) {
        sendOrderToWhatsApp(orderCode, items, shippingDetails, total, settings.whatsapp);
      }
      
      // Show success message with order code
      toast.success(`¡Pedido confirmado! Código: ${orderCode}`, {
        duration: 5000,
      });
      
      // Clear cart
      clearCart();
      
      // Redirect to home with order confirmation
      navigate('/', { 
        state: { 
          orderConfirmed: true, 
          orderCode: orderCode 
        } 
      });
      
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
    } finally {
      setIsProcessing(false);
    }
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
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
              disabled={isProcessing}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-pink-500 focus:border-pink-500 disabled:bg-gray-100"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Procesando pedido...
            </>
          ) : (
            'Confirmar Pedido'
          )}
        </button>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Al confirmar, recibirás un código de pedido y serás contactado vía WhatsApp.
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;