import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import './styles/ProductsList.css';
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={`w-4 h-4 ${i <= rating ? 'fill-primary' : 'fill-muted stroke-muted-foreground'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {products.map(product => (
        <div key={product.id} className="group relative rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl">
          <img
            src={"https://localhost:7233/" + product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
            style={{ aspectRatio: "400/400", objectFit: "cover" }}
          />
          <div className="p-4 bg-background">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{product.category}</span>
              <div className="flex items-center gap-0.5">
                {renderStars(product.rating)}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground line-clamp-1">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-2xl font-bold text-primary">£{product.price}</span>
              <Button size="sm" onClick={() => addToCart(product)}>Add to Cart</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
