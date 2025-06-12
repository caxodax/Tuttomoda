import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { useProducts } from '../hooks/useSupabase';
import { useCartStore } from '../stores/cartStore';
import ProductCard from '../components/products/ProductCard';
import toast from 'react-hot-toast';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, loading, refetch } = useProducts();
  const addToCart = useCartStore((state) => state.addToCart);
  
  const product = products.find(p => p.id === id);
  
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes ? product.sizes[0] : undefined
  );
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors ? product.colors[0] : undefined
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Reset quantity when product changes or stock updates
  useEffect(() => {
    if (product && product.stock > 0) {
      setQuantity(Math.min(1, product.stock));
    }
  }, [product?.stock]);
  
  // Get related products (same category, excluding current product)
  const relatedProducts = product 
    ? products.filter(p => p.category_id === product.category_id && p.id !== product.id).slice(0, 4)
    : [];
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 mt-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          Volver al inicio
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      toast.error('Producto agotado');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Solo hay ${product.stock} unidades disponibles`);
      return;
    }

    // Add to cart without updating stock (stock will be updated on order confirmation)
    addToCart(product, quantity, selectedSize, selectedColor);
    toast.success('Producto añadido al carrito');
    navigate('/cart');
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      setQuantity(1);
    } else if (newQuantity > product.stock) {
      setQuantity(product.stock);
      toast.error(`Solo hay ${product.stock} unidades disponibles`);
    } else {
      setQuantity(newQuantity);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={product.images.length > 1}
            className="h-full"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={index}>
                <TransformWrapper>
                  <TransformComponent>
                    <img 
                      src={image} 
                      alt={`${product.name} - Vista ${index + 1}`} 
                      className="w-full h-full object-contain"
                    />
                  </TransformComponent>
                </TransformWrapper>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-2xl font-bold text-pink-600 mb-4">${product.price.toFixed(2)}</div>
          
          <div className="prose mb-6">
            <p>{product.description}</p>
          </div>
          
          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Talla</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size 
                        ? 'border-pink-600 bg-pink-50 text-pink-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedColor === color 
                        ? 'border-pink-600 bg-pink-50 text-pink-600' 
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Quantity and Add to Cart */}
          <div className="flex flex-wrap gap-4 items-center mb-8">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button 
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="w-16 text-center py-2 border-0 focus:ring-0 focus:outline-none"
              />
              <button 
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stock}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                +
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!product || product.stock <= 0}
              className={`flex items-center px-8 py-3 rounded-md transition-colors ${
                product && product.stock > 0
                  ? 'bg-pink-600 hover:bg-pink-700 text-white'
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              {product && product.stock > 0 ? 'Añadir al carrito' : 'Agotado'}
            </button>
          </div>
          
          {/* Stock Status */}
          <div className="text-sm text-gray-600">
            {product.stock > 0 ? (
              <span className="text-green-600">✓ En stock ({product.stock} disponibles)</span>
            ) : (
              <span className="text-red-600">✕ Agotado</span>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;