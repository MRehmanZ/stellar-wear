import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { toast } from 'sonner';
import { Slider } from "@/components/ui/slider";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 500]); // Adjust the range as needed
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData.$values);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
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
    const quantity = parseInt(quantities[product.id], 10) || 1;
    addToCart(product, quantity);
    toast.success(`${quantity} ${product.name}(s) added to cart!`, { position: "bottom-right" });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`}
      />
    ));
  };

  const filteredAndSortedProducts = products
    .filter(product => 
      (selectedCategory === 'All' || selectedCategory === product.category) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a, b) => {
      if (sortOption === 'price-low-high') return a.price - b.price;
      if (sortOption === 'price-high-low') return b.price - a.price;
      if (sortOption === 'rating-high-low') return b.rating - a.rating;
      return 0;
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Collection</h1>
      
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Suits">Suits</SelectItem>
                <SelectItem value="Ties">Ties</SelectItem>
                <SelectItem value="Shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700">Sort By:</label>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger id="sort">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="rating-high-low">Rating: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price Range:</label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={500}
              step={10}
              className="w-48"
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>£{priceRange[0]}</span>
              <span>£{priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center text-gray-600">No products available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl bg-white"
            >
              <img
                src={`${import.meta.env.VITE_API_BASE_URL}/${product.imageUrl}`}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:opacity-80 transition-opacity"
              />
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {renderStars(product.rating)}
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-primary">£{product.price?.toFixed(2)}</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={quantities[product.id] || 1}
                      onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                      className="border p-1 w-16"
                    />
                    <Button size="sm" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
