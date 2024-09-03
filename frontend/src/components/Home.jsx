import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import FeaturedProducts from './FeaturedProducts';
import Heroes from './Heroes';
import InstagramFeed from './InstagramFeed';

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
    <div className="home-container">
      <Heroes
        title="Unleash Your Style"
        subtitle="Discover the latest in fashion trends"
        imageUrl="/Hero.jpg"
        linkUrl="/products"
      />
      <FeaturedProducts products={featuredProducts} />
      <InstagramFeed />
    </div>
  );
};

export default Home;
