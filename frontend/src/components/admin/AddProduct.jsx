// /src/components/admin/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("Category", category);
    formData.append("IsFeatured", isFeatured);
    formData.append("Rating", rating);
    formData.append("ImageFile", imageFile);

    try {
      const response = await fetch("https://localhost:7233/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleAddProduct}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <Select value={category} onValueChange={(value) => setCategory(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Suits">Suits</SelectItem>
              <SelectItem value="Ties">Ties</SelectItem>
              <SelectItem value="Shoes">Shoes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Featured</label>
          <Input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Rating</label>
          <Input type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <Input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        {imagePreview && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Image Preview</label>
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-md shadow-md" />
          </div>
        )}
        <Button type="submit" className="w-full">Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;
