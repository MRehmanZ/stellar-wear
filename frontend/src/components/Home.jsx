import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import ProductsList from './ProductsList';
import Heroes from './Heroes';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const featured = productsData.$values.filter(product => product.rating >= 4);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Heroes
        title="Collection"
        subtitle="Explore the latest trends"
        imageUrl="/Hero.jpg"
        linkUrl="/products"
      />
      <h1 className="text-4xl font-bold mb-6">Featured Products</h1>
      <ProductsList products={featuredProducts} />
      
      {/* Add more components like banners, collections, etc. */}
    </div>
  );
};

export default Home;
