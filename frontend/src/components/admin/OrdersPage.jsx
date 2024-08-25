// /src/components/admin/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders from the backend
    fetch("https://localhost:7233/api/order")
      .then((res) => res.json())
      .then((data) => setOrders(data.$values));
      console.log(orders)
  }, []);

  const handleView = (id) => {
    navigate(`/admin/orders/${id}`);
  };

  return (
    <div className="admin-orders-page">
      <h1 className="text-4xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full mt-6 bg-white shadow-md rounded">
        <thead>
          <tr>
            <th className="p-3 text-left">Order Number</th>
            <th className="p-3 text-left">Total Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-3">{order.orderNumber}</td>
              <td className="p-3">£{order.totalAmount}</td>
              <td className="p-3">{order.status}</td>
              <td className="p-3">
                <Button onClick={() => handleView(order.id)} className="mr-2">
                  <FaEye />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
