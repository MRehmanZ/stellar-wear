import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (quantity > 1) {
        toast.success(`${quantity} ${product.name}s added to cart!`, { position: "bottom-right" });
    } else {
        toast.success(`${quantity} ${product.name} added to cart!`, { position: "bottom-right" });
    }
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
    <Link to={`/product/${product.id}`} className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:bg-gray-50">
        <CardHeader className="p-0 relative">
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${product.imageUrl}`} 
            alt={product.name}
            className="w-full h-48 object-cover"
            width={200}
            height={200}
          />
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
              Featured
            </Badge>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
            <Badge variant="secondary" className="text-sm">
              {product.category}
            </Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            {renderStars(product.rating)}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">£{product.price?.tofixed(2)}</span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); e.preventDefault(); decrementQuantity(); }}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => { e.stopPropagation(); e.preventDefault(); handleQuantityChange(e); }}
                className="w-16 text-center"
              />
              <Button variant="outline" size="icon" onClick={(e) => { e.stopPropagation(); e.preventDefault(); incrementQuantity(); }}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleAddToCart(); }}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
