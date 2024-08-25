import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import ProductCard from './ProductCard';

const ShoesPage = () => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const shoesProducts = productsData.$values.filter(product => product.category === 'Shoes');
        setShoes(shoesProducts);
      } catch (error) {
        console.error('Error fetching shoes:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Shoes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {shoes.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ShoesPage;
