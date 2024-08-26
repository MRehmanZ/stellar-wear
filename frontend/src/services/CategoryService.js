export const fetchCategories = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  };
  
  export const createCategory = async (category) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  };
  
  export const updateCategory = async (id, category) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
  };
  
  export const deleteCategory = async (id) => {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete category');
  };
  