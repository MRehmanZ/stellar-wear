import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.$values);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <section className="w-full  md:py-2 lg:py-2 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Featured Products</h2>
          <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
            Discover our handpicked selection of top-tier products. Unmatched quality, unbeatable prices.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-12">
          {products.map((product) => product.isFeatured && (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
};

export default FeaturedProducts;
