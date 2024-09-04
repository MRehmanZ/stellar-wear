import React, { useEffect, useState } from 'react';
import { getWishlist, removeFromWishlist } from '../services/WishlistService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Link, Navigate } from 'react-router-dom';
import { HeartOff, ShoppingCart } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const items = await getWishlist();
        setWishlistItems(items.$values || []); 
      } catch (error) {
        toast.error('Please login.');
      }
    };

    fetchWishlist();
  }, []);

  const handleAddToCart = (item) => {
    const { product } = item;
    addToCart(product, 1); // Add with quantity 1
    toast.success(`${product.name} added to cart!`);
  };

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await removeFromWishlist(itemId);
      console.log(wishlistItems)
      setWishlistItems(wishlistItems.filter(item => item.productId !== itemId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error('Failed to remove item from wishlist');
    }
  };

  if (wishlistItems.length === 0) {
    return <div className="container mx-auto p-6 text-center text-lg">Your wishlist is empty.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlistItems.map((item) => (
          <Link to={`/product/${item.product.id}`} className="block group">
            <Card key={item.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="p-0 relative">
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}/${item.product.imageUrl}`}
                  alt={item.product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveFromWishlist(item.product.id)}
                  className="absolute top-2 right-2 bg-white bg-opacity-75 hover:bg-opacity-100 text-red-600 rounded-full p-2"
                >
                  <HeartOff className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">{item.product.name}</h2>
                <p className="text-muted-foreground mb-2">£{item.product.price?.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mb-4">{item.product.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between p-4">
                <Link to={`/product/${item.product.id}`} className="text-primary hover:underline">
                  View Details
                </Link>
                <Button onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
