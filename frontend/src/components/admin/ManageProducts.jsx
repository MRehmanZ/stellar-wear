import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.$values))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    // Implement save functionality
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selectedProduct),
    });

    if (response.ok) {
      setProducts(products.map(p => (p.id === selectedProduct.id ? selectedProduct : p)));
      setIsDialogOpen(false);
      toast.success("Product updated successfully!");
    } else {
      toast.error("Failed to update product.");
    }
  };

  const handleDelete = (id) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/product/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    }).catch(() => toast.error("Failed to delete product."));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({ ...selectedProduct, [name]: value });
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Manage Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate("/admin/products/new")} className="mb-4">
            Add New Product
          </Button>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>£{product.price?.toFixed(2)}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(product)} className="mr-2" variant="outline" size="icon">
                      <FaEdit />
                    </Button>
                    <Button onClick={() => handleDelete(product.id)} variant="destructive" size="icon">
                      <FaTrash />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Product</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={selectedProduct.price}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={selectedProduct.category}
                  onValueChange={(value) => setSelectedProduct({ ...selectedProduct, category: value })}
                >
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
              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={selectedProduct.imageUrl}
                  onChange={handleInputChange}
                />
              </div>
              <Button onClick={handleSave} className="mt-4">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ManageProducts;
