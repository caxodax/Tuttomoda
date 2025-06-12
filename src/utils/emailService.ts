import { CartItem, ShippingDetails } from '../types';
import { formatOrderForEmail } from './orderUtils';

interface EmailConfig {
  serviceId: string;
  templateId: string;
  publicKey: string;
  fromEmail: string;
  toEmail: string;
}

// This would be configured in your environment variables
const EMAIL_CONFIG: EmailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  fromEmail: import.meta.env.VITE_FROM_EMAIL || 'noreply@tuttomoda.com',
  toEmail: import.meta.env.VITE_TO_EMAIL || 'orders@tuttomoda.com'
};

export const sendOrderEmail = async (
  orderCode: string,
  items: CartItem[],
  shippingDetails: ShippingDetails,
  total: number
): Promise<boolean> => {
  try {
    // For now, we'll use a simple fetch to a backend endpoint
    // In a real implementation, you would use EmailJS or a backend service
    
    const emailContent = formatOrderForEmail(orderCode, items, shippingDetails, total);
    
    // This is a placeholder for the actual email sending logic
    // You would replace this with your preferred email service
    console.log('Email would be sent with content:', emailContent);
    
    // Simulate email sending
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

// Alternative implementation using EmailJS (if you want to use it)
export const sendOrderEmailWithEmailJS = async (
  orderCode: string,
  items: CartItem[],
  shippingDetails: ShippingDetails,
  total: number
): Promise<boolean> => {
  try {
    // This would require installing EmailJS
    // npm install @emailjs/browser
    
    const emailContent = formatOrderForEmail(orderCode, items, shippingDetails, total);
    
    const templateParams = {
      to_email: EMAIL_CONFIG.toEmail,
      from_email: EMAIL_CONFIG.fromEmail,
      subject: `Nuevo Pedido - ${orderCode}`,
      html_content: emailContent,
      order_code: orderCode,
      customer_name: shippingDetails.fullName,
      customer_email: shippingDetails.email,
      total_amount: total.toFixed(2)
    };

    // EmailJS implementation would go here
    console.log('EmailJS would send:', templateParams);
    
    return true;
  } catch (error) {
    console.error('Error sending email with EmailJS:', error);
    return false;
  }
};