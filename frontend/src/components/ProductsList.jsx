import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import { Button } from "@/components/ui/button";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

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

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product.id] || 1; // Get the specified quantity or default to 1
    addToCart(product, quantity); // Add the product to the cart with the specified quantity
  };

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
                <Badge variant="secondary">{product.category}</Badge>
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
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  value={quantities[product.id] || 1}
                  onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value))}
                  className="border p-1 w-16"
                />
                <Button size="sm" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ProductsList;
