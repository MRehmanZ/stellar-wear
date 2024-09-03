import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get the order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/order/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <p>{error}</p>
      </Alert>
    );
  }

  if (!order) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Order Not Found</AlertTitle>
        <p>The order you are looking for does not exist.</p>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Order Number: {order.orderNumber}</h2>
            <p className="text-muted-foreground">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Items</h3>
            <ul className="space-y-2">
              {order.orderItems.$values.map((item) => (
                <li key={item.productId} className="flex justify-between">
                  <span>{item.productName}</span>
                  <span>{item.quantity} x £{item.price?.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Total Amount</h3>
            <p className="text-2xl font-bold">£{order.totalAmount.toFixed(2)}</p>
          </div>
          <Button onClick={() => window.history.back()} variant="outline">Back to Orders</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderDetails;
