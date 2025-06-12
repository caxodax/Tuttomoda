import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import HeroSlider from '../components/home/HeroSlider';
import CategoriesShowcase from '../components/home/CategoriesShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';

const HomePage: React.FC = () => {
  const location = useLocation();
  const orderConfirmed = location.state?.orderConfirmed;
  const orderCode = location.state?.orderCode;

  useEffect(() => {
    if (orderConfirmed) {
      // Clear the state after showing the message
      window.history.replaceState({}, document.title);
    }
  }, [orderConfirmed]);

  return (
    <div>
      {orderConfirmed && orderCode && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mx-4 mt-20 mb-8">
          <div className="flex items-center justify-center text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-green-800">
                ¡Pedido Confirmado!
              </h3>
              <p className="text-green-700 mt-1">
                Tu código de pedido es: <span className="font-bold">{orderCode}</span>
              </p>
              <p className="text-sm text-green-600 mt-2">
                Recibirás confirmación por WhatsApp y email. ¡Gracias por tu compra!
              </p>
            </div>
          </div>
        </div>
      )}
      
      <HeroSlider />
      <CategoriesShowcase />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;