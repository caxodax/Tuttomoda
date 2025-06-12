import { CartItem, ShippingDetails } from '../types';

export const generateOrderCode = (): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `TM-${timestamp}-${random}`.toUpperCase();
};

export const calculateOrderTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const formatOrderForEmail = (
  orderCode: string,
  items: CartItem[],
  shippingDetails: ShippingDetails,
  total: number
): string => {
  let emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #ec4899; color: white; padding: 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 24px;">tuttomoda</h1>
        <p style="margin: 5px 0 0 0;">Nuevo Pedido Recibido</p>
      </div>
      
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #333; margin-bottom: 20px;">Código de Pedido: ${orderCode}</h2>
        
        <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #ec4899; margin-top: 0;">Datos del Cliente</h3>
          <p><strong>Nombre:</strong> ${shippingDetails.fullName}</p>
          <p><strong>Email:</strong> ${shippingDetails.email}</p>
          <p><strong>Teléfono:</strong> ${shippingDetails.phone}</p>
          <p><strong>Dirección:</strong> ${shippingDetails.address}</p>
          <p><strong>Ciudad:</strong> ${shippingDetails.city}</p>
          ${shippingDetails.postalCode ? `<p><strong>Código Postal:</strong> ${shippingDetails.postalCode}</p>` : ''}
          ${shippingDetails.notes ? `<p><strong>Notas:</strong> ${shippingDetails.notes}</p>` : ''}
        </div>
        
        <div style="background-color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #ec4899; margin-top: 0;">Productos Pedidos</h3>
  `;

  items.forEach((item) => {
    emailContent += `
      <div style="border-bottom: 1px solid #eee; padding: 15px 0; display: flex; align-items: center;">
        <img src="${item.product.images[0]}" alt="${item.product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px; margin-right: 15px;">
        <div style="flex: 1;">
          <h4 style="margin: 0 0 5px 0; color: #333;">${item.product.name}</h4>
          <p style="margin: 0; color: #666;">Cantidad: ${item.quantity}</p>
          <p style="margin: 0; color: #666;">Precio unitario: $${item.product.price.toFixed(2)}</p>
          ${item.selectedSize ? `<p style="margin: 0; color: #666;">Talla: ${item.selectedSize}</p>` : ''}
          ${item.selectedColor ? `<p style="margin: 0; color: #666;">Color: ${item.selectedColor}</p>` : ''}
          <p style="margin: 5px 0 0 0; font-weight: bold; color: #ec4899;">Subtotal: $${(item.product.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    `;
  });

  emailContent += `
        </div>
        
        <div style="background-color: white; padding: 15px; border-radius: 8px; text-align: center;">
          <h3 style="color: #ec4899; margin-top: 0;">Total del Pedido</h3>
          <p style="font-size: 24px; font-weight: bold; color: #333; margin: 0;">$${total.toFixed(2)}</p>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666;">
          <p>Este pedido ha sido enviado automáticamente desde tuttomoda</p>
          <p>Fecha: ${new Date().toLocaleString('es-ES')}</p>
        </div>
      </div>
    </div>
  `;

  return emailContent;
};