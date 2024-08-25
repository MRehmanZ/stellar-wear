import React, { useEffect, useState } from 'react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../services/CategoryService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        console.log(data)
        setCategories(data.$values);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    loadCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const newCategory = await createCategory({ name: newCategoryName });
      setCategories([...categories, newCategory]);
      setNewCategoryName('');
      toast.success("Category added successfully!");
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category.");
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await updateCategory(editingCategory.id, { name: editingCategory.name });
      setCategories(categories.map(cat => cat.id === editingCategory.id ? editingCategory : cat));
      setEditingCategory(null);
      toast.success("Category updated successfully!");
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
      toast.success("Category deleted successfully!");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Categories</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="New Category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="mr-2"
        />
        <Button onClick={handleAddCategory}>Add Category</Button>
      </div>
      <div className="grid gap-4">
        {categories.map((category) => (
          <div key={category.id} className="flex justify-between items-center">
            {editingCategory && editingCategory.id === category.id ? (
              <Input
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="mr-2"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div className="space-x-2">
              {editingCategory && editingCategory.id === category.id ? (
                <Button onClick={handleUpdateCategory}>Save</Button>
              ) : (
                <Button onClick={() => setEditingCategory(category)}>Edit</Button>
              )}
              <Button variant="destructive" onClick={() => handleDeleteCategory(category.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageCategories;
