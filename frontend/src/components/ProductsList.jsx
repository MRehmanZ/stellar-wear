import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

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
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ));
  };

  return (
    <div className="grid space-y-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
      {products.map(product => product.isFeatured && (
        <Card className="w-full max-w-sm mx-auto" key={product.id}>
          <CardContent className="p-4">
            <div className="aspect-square relative mb-4">
              <img
                src={"https://localhost:7233/" + product.imageUrl}
                alt={product.name}
                width={400}
                height={400}
                className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
                style={{ aspectRatio: "400/400", objectFit: "cover" }}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <Badge variant="secondary">Office</Badge>
              </div>
              <div className="flex items-center space-x-1">
                {renderStars(product.rating)}
                <span className="text-sm text-gray-600 ml-2">{product.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-3">
                {product.description}
              </p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex items-center justify-between w-full">
              <span className="text-xl font-bold">£{product.price}</span>
              <Button
                className="bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                style={{ padding: "6px 12px", minWidth: "auto" }}  // Explicitly set the width
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
