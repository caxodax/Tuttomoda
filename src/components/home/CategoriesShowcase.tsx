import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useSupabase';
import { Loader2 } from 'lucide-react';

const CategoriesShowcase: React.FC = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Nuestras Categorías</h2>
          <p className="text-gray-600">Explora nuestra colección por categorías</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative h-80 overflow-hidden rounded-lg"
            >
              <img 
                src={category.image_url || 'https://via.placeholder.com/400x300'} 
                alt={category.name}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesShowcase;