import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import ProductCard from './ProductCard';

const AccessoriesPage = () => {
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        const accessoriesProducts = productsData.$values.filter(product => product.category === 'Accessories');
        setAccessories(accessoriesProducts);
      } catch (error) {
        console.error('Error fetching accessories:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Accessories</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {accessories.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AccessoriesPage;
