// /src/components/admin/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    fetch("https://localhost:7233/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.$values));
      console.log(products)
  }, []);

  const handleEdit = (id) => {
    navigate(`/admin/products/${id}/edit`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    fetch(`https://localhost:7233/api/product/${id}`, {
      method: "DELETE",
    }).then(() => setProducts(products.filter((product) => product.id !== id)));
  };

  return (
    <div className="admin-products-page">
      <h1 className="text-4xl font-bold mb-6">Manage Products</h1>
      <Button onClick={() => navigate("/admin/products/new")}>Add New Product</Button>
      <table className="w-full mt-6 bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="p-3">{product.name}</td>
              <td className="p-3">£{product.price}</td>
              <td className="p-3">{product.stock}</td>
              <td className="p-3">
                <Button onClick={() => handleEdit(product.id)} className="mr-2">
                  <FaEdit />
                </Button>
                <Button onClick={() => handleDelete(product.id)} variant="destructive">
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsPage;
