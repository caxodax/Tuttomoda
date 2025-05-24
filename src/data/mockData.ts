import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Vestidos', image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '2', name: 'Pantalones', image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '3', name: 'Blusas', image: 'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: '4', name: 'Accesorios', image: 'https://images.pexels.com/photos/1078973/pexels-photo-1078973.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Vestido Elegante Rosa',
    description: 'Hermoso vestido rosa para ocasiones especiales. Confeccionado con tela de alta calidad y un diseño moderno que resalta tu figura.',
    price: 89.99,
    images: [
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '1',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Rosa', 'Negro'],
    isFeatured: true,
    isNew: true,
    stock: 15
  },
  {
    id: '2',
    name: 'Pantalón Negro Clásico',
    description: 'Pantalón negro clásico para toda ocasión. Material duradero y cómodo para uso diario o formal.',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '2',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Negro'],
    isFeatured: false,
    isNew: false,
    stock: 25
  },
  {
    id: '3',
    name: 'Blusa Rosa Delicada',
    description: 'Blusa rosa con detalles delicados. Perfecta para combinar con jeans o faldas para un look casual chic.',
    price: 39.99,
    images: [
      'https://images.pexels.com/photos/6764037/pexels-photo-6764037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6764037/pexels-photo-6764037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '3',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Rosa', 'Blanco'],
    isFeatured: true,
    isNew: true,
    stock: 20
  },
  {
    id: '4',
    name: 'Collar Elegante',
    description: 'Collar elegante que complementa cualquier outfit. Añade un toque de sofisticación a tu estilo.',
    price: 29.99,
    images: [
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1232931/pexels-photo-1232931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '4',
    colors: ['Plateado', 'Dorado'],
    isFeatured: false,
    isNew: true,
    stock: 30
  },
  {
    id: '5',
    name: 'Vestido de Gala Negro',
    description: 'Espectacular vestido negro para eventos formales. Diseño elegante que realza tu figura con detalles sofisticados.',
    price: 129.99,
    images: [
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    ],
    categoryId: '1',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Negro'],
    isFeatured: true,
    isNew: false,
    stock: 10
  }
];

export const featuredProducts = products.filter(product => product.isFeatured);
export const newProducts = products.filter(product => product.isNew);