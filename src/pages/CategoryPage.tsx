import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts, useCategories } from '../hooks/useSupabase';
import { Loader2 } from 'lucide-react';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const category = categories.find(cat => cat.id === id);
  const categoryProducts = products.filter(product => product.category_id === id);
  
  if (productsLoading || categoriesLoading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoría no encontrada</h1>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="text-gray-600 mt-2">Explora nuestra colección de {category.name.toLowerCase()}</p>
      </div>
      
      {categoryProducts.length > 0 ? (
        <ProductGrid products={categoryProducts} />
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No hay productos disponibles en esta categoría.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;