import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import "./styles/OrderConfirmation.css";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const state = location.state;
    if (state && state.order) {
      setOrder(state.order);
    } else {
      navigate("/"); // Redirect to home if no order data
    }
  }, [location.state, navigate]);

  if (!order) {
    return (
      <div className="order-confirmation-container">
        <h1>Order not found</h1>
        <Button onClick={() => navigate("/")}>Go to Home</Button>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <h1>Thank You for Your Purchase!</h1>
        <p>Your order number is <strong>{order.orderNumber}</strong>.</p>
        <h2>Order Summary</h2>
        <ul>
          {order.items && order.items.length > 0 ? (
            order.items.map((item) => (
              <li key={item.productId}>
                {item.productName} - {item.quantity} x £{item.price}
              </li>
            ))
          ) : (
            <li>No items found in this order.</li>
          )}
        </ul>
        <h3>
          Payment Status:{" "}
          <span className={order.status === "Completed" ? "status-success" : "status-failed"}>
            {order.status}
          </span>
        </h3>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
