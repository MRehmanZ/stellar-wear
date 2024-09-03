import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/OrderService';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from '@/lib/formatDate'; // Utility function to format date

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
          setOrders(response.$values);
        } catch (error) {
          console.error('Failed to fetch orders:', error);
        }
      };

      fetchOrders();
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order Number</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.orderNumber}</TableCell>
                    <TableCell>{formatDate(order.createdAt)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>£{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button onClick={() => navigate(`/order/${order.id}`)} variant="outline">
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center text-gray-500">You have no orders.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Utility function to format status badges
const getStatusVariant = (status) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'warning';
    case 'completed':
      return 'success';
    case 'cancelled':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default OrdersPage;
