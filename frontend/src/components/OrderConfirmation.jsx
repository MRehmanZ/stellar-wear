import { Check, Printer, ChevronRight, ShoppingBag, Truck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getCurrentOrderAddress } from "../services/OrderService";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchOrderAndAddress = async () => {
      const state = location.state;
      if (state && state.order) {
        setOrder(state.order);
        if (state.order.addressId) {
          try {
            const currentAddress = await getCurrentOrderAddress(state.order.addressId);
            setAddress(currentAddress);
            console.log("Fetched Address: ", currentAddress);
          } catch (error) {
            console.error("Error fetching address:", error);
          }
        }
      } else {
        navigate("/"); // Redirect to home if no order data
      }
    };

    fetchOrderAndAddress();
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
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Thank You for Your Order!</h1>
          <p className="text-xl text-muted-foreground">Your fashion journey begins here.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-lg overflow-hidden">
              <CardHeader className="bg-black text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">Order Confirmed</CardTitle>
                      <p className="text-zinc-300">Order #{order.orderNumber}</p>
                    </div>
                  </div>
                  <Button variant="secondary" size="sm" className="text-black">
                    <Printer className="w-4 h-4 mr-2" />
                    Print Receipt
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-xl mb-4">Order Summary</h3>
                    <div className="space-y-4">
                      {order.orderItems.$values.map((orderItem) => (
                        <div className="flex items-center space-x-4" key={orderItem.id}>
                          <div className="relative w-24 h-24 bg-zinc-100 rounded-md overflow-hidden">
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL}/${orderItem.imageUrl}`} 
                              alt={orderItem.productName}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-lg">{orderItem.productName}</h4>
                            <p className="font-medium">£{orderItem.price} x {orderItem.quantity}</p>
                          </div>
                          <p className="font-medium text-lg">£{(orderItem.price * orderItem.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-lg">
                      <span>Subtotal</span>
                      <span>£{order.totalAmount}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>Shipping</span>
                      <span>£9.99</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>VAT</span>
                      <span>£{(order.totalAmount * 0.2).toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-xl">
                      <span>Total</span>
                      <span>£{(order.totalAmount + 9.99 + order.totalAmount * 0.2).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">{address?.street}</p>
                  <p>{address?.city}, {address?.state} {address?.postalCode}</p>
                  <p>{address?.country}</p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">Credit Card</p>
                  <p>Visa ending in 1234</p>
                  <p>Expiration: 12/2025</p>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="space-y-8">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Order Confirmed</p>
                      <p className="text-muted-foreground">June 15, 2023 - 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center mr-4">
                      <ShoppingBag className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Processing</p>
                      <p className="text-muted-foreground">Estimated: June 16, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-zinc-200 rounded-full flex items-center justify-center mr-4">
                      <Truck className="w-6 h-6 text-zinc-500" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">Shipping</p>
                      <p className="text-muted-foreground">Estimated: June 18, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full text-lg">
                  Track Order
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Exclusive Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-lg">Get 15% off your next purchase with code:</p>
                <p className="text-3xl font-bold tracking-wide bg-white text-black py-3 px-4 rounded-md text-center">
                  STYLISH15
                </p>
              </CardContent>
              <CardFooter>
                <Link to="/shop" className="w-full text-purple-600 text-lg">
                  Shop Now
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
