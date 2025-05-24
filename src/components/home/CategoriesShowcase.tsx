import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/mockData';

const CategoriesShowcase: React.FC = () => {
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
                src={category.image} 
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