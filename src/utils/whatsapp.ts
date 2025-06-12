import { CartItem, ShippingDetails } from '../types';

export const sendOrderToWhatsApp = (
  orderCode: string,
  items: CartItem[], 
  shippingDetails: ShippingDetails, 
  total: number,
  whatsappNumber: string
) => {
  const phone = whatsappNumber.replace(/[^0-9]/g, '');
  
  // Create order message
  let message = `*Nuevo Pedido - tuttomoda*\n\n`;
  message += `*Código de Pedido: ${orderCode}*\n\n`;
  message += `*Datos del Cliente*\n`;
  message += `Nombre: ${shippingDetails.fullName}\n`;
  message += `Email: ${shippingDetails.email}\n`;
  message += `Teléfono: ${shippingDetails.phone}\n`;
  message += `Dirección: ${shippingDetails.address}\n`;
  message += `Ciudad: ${shippingDetails.city}\n`;
  
  if (shippingDetails.postalCode) {
    message += `Código Postal: ${shippingDetails.postalCode}\n`;
  }
  
  if (shippingDetails.notes) {
    message += `Notas: ${shippingDetails.notes}\n`;
  }
  
  message += `\n*Productos*\n`;
  
  items.forEach((item) => {
    message += `• ${item.product.name} (${item.quantity})\n`;
    message += `  Precio: $${item.product.price.toFixed(2)}\n`;
    
    if (item.selectedSize) {
      message += `  Talla: ${item.selectedSize}\n`;
    }
    
    if (item.selectedColor) {
      message += `  Color: ${item.selectedColor}\n`;
    }
    
    message += `  Subtotal: $${(item.product.price * item.quantity).toFixed(2)}\n\n`;
  });
  
  message += `\n*Total del Pedido: $${total.toFixed(2)}*\n`;
  message += `\nFecha: ${new Date().toLocaleString('es-ES')}`;
  
  // Encode the message for WhatsApp
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank');
};