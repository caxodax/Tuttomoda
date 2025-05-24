import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { featuredProducts } from '../../data/mockData';

const FeaturedProducts: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Ropa más vendida</h2>
          <p className="text-gray-600">Descubre nuestras prendas más populares</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link 
            to="/category/1" 
            className="inline-block border-2 border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white px-6 py-3 rounded-md transition-colors font-medium"
          >
            Ver más productos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;