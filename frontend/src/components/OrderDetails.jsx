import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./styles/OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`https://localhost:7233/api/order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            "UserId": localStorage.getItem('userId'),
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setOrder(data); // Set the order state with fetched data
        } else {
          setError("Failed to load order details");
        }
      } catch (error) {
        setError("An error occurred while fetching order details.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details-container">
      <h1>Order Details</h1>
      <p>Order Number: {order.orderNumber}</p>
      <h2>Items</h2>
      <ul>
        {order.orderItems.$values.map((item) => (
          <li key={item.productId}>
            {item.productName} - {item.quantity} x £{item.price}
          </li>
        ))}
      </ul>
      <h3>Total Amount: £{order.totalAmount}</h3>
      <Button onClick={() => window.history.back()}>Back to Orders</Button>
    </div>
  );
};

export default OrderDetails;
