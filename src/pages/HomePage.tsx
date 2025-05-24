import React from 'react';
import HeroSlider from '../components/home/HeroSlider';
import CategoriesShowcase from '../components/home/CategoriesShowcase';
import FeaturedProducts from '../components/home/FeaturedProducts';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSlider />
      <CategoriesShowcase />
      <FeaturedProducts />
    </div>
  );
};

export default HomePage;