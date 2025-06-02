import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../products/ProductCard';
import { useProducts } from '../../hooks/useSupabase';
import { Loader2 } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.filter(product => product.is_featured);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (featuredProducts.length === 0) {
    return null;
  }

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
            to="/products" 
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