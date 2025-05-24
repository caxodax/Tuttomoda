import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-16 text-center">
      <h1 className="text-9xl font-bold text-pink-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-6">Página no encontrada</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-8">
        La página que estás buscando no existe o ha sido movida a otra dirección.
      </p>
      <Link
        to="/"
        className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-md transition-colors font-medium"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFoundPage;