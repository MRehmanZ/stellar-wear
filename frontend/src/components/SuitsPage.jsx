import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import ProductCard from './ProductCard';

const SuitsPage = () => {
  const [suits, setSuits] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const suitsProducts = productsData.$values.filter(product => product.category === 'Suits');
        setSuits(suitsProducts);
      } catch (error) {
        console.error('Error fetching suits:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Suits</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {suits.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default SuitsPage;
