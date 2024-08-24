import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import ProductsList from './FeaturedProducts';
import Heroes from './Heroes';
import FeaturedProducts from './FeaturedProducts';

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
      <FeaturedProducts products={featuredProducts} />
      
      {/* Add more components like banners, collections, etc. */}
    </div>
  );
};

export default Home;
