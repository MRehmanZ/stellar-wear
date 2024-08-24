// /src/components/admin/OrderDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch order details from the backend
    fetch(`https://localhost:7233/api/order/${orderId}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-order-details-page">
      <h1 className="text-4xl font-bold mb-6">Order Details</h1>
      <p><strong>Order Number:</strong> {order.orderNumber}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total Amount:</strong> £{order.totalAmount}</p>

      <h2 className="text-2xl font-bold mt-6">Items</h2>
      <ul className="mt-4">
        {order.orderItems.map((item) => (
          <li key={item.productId} className="mb-2">
            {item.productName} - {item.quantity} x £{item.price}
          </li>
        ))}
      </ul>

      <Button onClick={() => navigate("/admin/orders")} className="mt-6">Back to Orders</Button>
    </div>
  );
};

export default OrderDetailsPage;
