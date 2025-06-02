import React, { useEffect } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useSupabase';
import { Loader2 } from 'lucide-react';

const AllProductsPage: React.FC = () => {
  const { products, loading } = useProducts();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Todos los Productos</h1>
        <p className="text-gray-600 mt-2">Explora nuestra colección completa</p>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No hay productos disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default AllProductsPage;