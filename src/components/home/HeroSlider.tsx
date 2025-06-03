import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';
import { useProducts } from '../../hooks/useSupabase';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider: React.FC = () => {
  const { products, loading } = useProducts();
  const sliderProducts = products
    .filter(product => product.is_slider)
    .slice(0, 5);
  
  if (loading || sliderProducts.length === 0) {
    return null;
  }
  
  return (
    <section className="relative h-[350px] md:h-[450px] mt-16">
      <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{ delay: 5000 }}
        loop={true}
        className="h-full"
      >
        {sliderProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="relative h-full w-full">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat"
                style={{ 
                  backgroundImage: `url(${product.images[0]})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="container mx-auto px-4 h-full relative z-10">
                <div className="flex items-center h-full">
                  <div className="max-w-xl text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>
                    <p className="text-lg mb-6">{product.description}</p>
                    <div className="mb-8">
                      <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
                    </div>
                    <Link 
                      to={`/product/${product.id}`}
                      className="inline-flex items-center bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
                    >
                      Ver detalles
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;