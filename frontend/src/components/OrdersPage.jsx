import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/OrderService';
import './styles/OrdersPage.css'; // Create this CSS file for styling

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      const fetchOrders = async () => {
        try {
          const response = await getOrders();
          console.log(response.$values)
          setOrders(response.$values);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };

      fetchOrders();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="orders-container">
      <h1>Your Orders</h1>
      {orders.length > 0 ? (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderNumber}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>£{order.totalAmount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => navigate(`/order/${order.id}`)}
                    className="view-details-button"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>You have no orders.</p>
      )}
    </div>
  );
};

export default OrdersPage;
