import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/ProductService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaStar } from "react-icons/fa";
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify'; // Using react-toastify for notifications

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="mb-6">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="All">All</option>
          <option value="Suits">Suits</option>
          <option value="Ties">Ties</option>
          <option value="Shoes">Shoes</option>
        </select>
      </div>

      {products.length === 0 ? (
        <div>No products available.</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) =>
            (selectedCategory === 'All' || selectedCategory === product.category) && (
              <div
                key={product.id}
                className="group relative rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl"
              >
                <img
                  src={`https://localhost:7233/${product.imageUrl}`}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-[300px] object-cover group-hover:opacity-80 transition-opacity"
                />
                <div className="p-4 bg-background">
                  <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                    {product.description}
                  </p>
                  <div className="flex items-center gap-1 mt-2">{renderStars(product.rating)}</div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-2xl font-bold text-primary">£{product.price}</span>
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
            )
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
