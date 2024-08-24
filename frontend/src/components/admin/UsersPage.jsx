// /src/components/admin/UsersPage.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend
    fetch("https://localhost:7233/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data.$values));
      console.log(users)
  }, []);

  const handleDelete = (id) => {
    // Implement delete functionality
    fetch(`https://localhost:7233/api/user/${id}`, {
      method: "DELETE",
    }).then(() => setUsers(users.filter((user) => user.id !== id)));
  };

  return (
    <div className="admin-users-page">
      <h1 className="text-4xl font-bold mb-6">Manage Users</h1>
      <table className="w-full mt-6 bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-3 text-left">Username</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-3">{user.userName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                <Button onClick={() => handleDelete(user.id)} variant="destructive">
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

export default UsersPage;
