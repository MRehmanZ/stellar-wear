import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { getProduct } from '../services/ProductService';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // Fetch product data from backend
    const fetchProduct = async () => {
      try {
        console.log(id)
        const product = await getProduct(id);
        setProduct(product);
        setSelectedSize(product.sizes.$values[0]);
        setSelectedColor(product.colors.$values[0]);
        setReviews(product.reviews.$values);

        console.log(product.colors.$values)
        console.log(product.sizes.$values)
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await axios.post('/api/cart', {
        productId: product.id,
        size: selectedSize,
        color: selectedColor,
        quantity: 1,
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const newReview = {
        productId: product.id,
        rating,
        comment: reviewText,
      };
      const response = await axios.post('/api/reviews', newReview);
      setReviews([...reviews, response.data]);
      setReviewText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <img
            src={`${import.meta.env.VITE_API_BASE_URL}/${product.imageUrl}`} 
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-xl font-semibold mt-2">£{product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-5 h-5 ${i < product.rating ? 'fill-primary' : ''}`} />
            ))}
            <span className="text-sm text-muted-foreground">({product.rating} out of 5)</span>
          </div>
          <p className="text-muted-foreground">{product.description}</p>
          <div>
            <h3 className="font-semibold mb-2">Size</h3>
            <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
              {product.sizes.$values.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`size-${size}`} />
                  <Label htmlFor={`size-${size}`}>{size}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Color</h3>
            <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
              {product.colors.$values.map((color) => (
                <div key={color} className="flex items-center space-x-2">
                  <RadioGroupItem value={color} id={`color-${color}`} />
                  <Label htmlFor={`color-${color}`}>{color}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex space-x-4">
            <Button className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button variant="outline">
              <Heart className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h3 className="font-semibold">Product Details</h3>
            <h2 className="list-disc list-inside text-sm text-muted-foreground mt-2">
              {product.description}
            </h2>
          </div>
        </div>
      </div>
      <Separator className="my-8" />
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Customer Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src="https://github.com/shadcn.png"
                    alt={review.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-primary' : ''}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Leave a Review</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer ${i < rating ? 'fill-primary' : ''}`}
                    onClick={() => setRating(i + 1)}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Write your review here..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
              />
              <Button onClick={handleSubmitReview}>Submit Review</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ProductDetail;
