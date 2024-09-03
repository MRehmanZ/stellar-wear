import { X, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPanel = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    onClose(); 
    navigate('/checkout');
  };

  const handleDecrement = (itemId, currentQuantity) => {
    const newQuantity = currentQuantity - 1;
    if (newQuantity >= 1) {
      updateCartItemQuantity(itemId, newQuantity);
    }
  };

  const handleIncrement = (itemId, currentQuantity) => {
    updateCartItemQuantity(itemId, currentQuantity + 1);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="px-4 pt-4 pb-2">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-lg font-semibold">Your Cart</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-grow px-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 py-4 border-b">
                <div className="relative w-20 h-20 rounded-md overflow-hidden">
                  <img
                    src={`${import.meta.env.VITE_API_BASE_URL}/${item.imageUrl}`} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium text-base">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">£{item.price?.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDecrement(item.id, item.quantity)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-2 min-w-[2rem] text-center text-sm">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleIncrement(item.id, item.quantity)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">Your cart is empty</p>
          )}
        </ScrollArea>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 mt-4 sticky bottom-0 bg-white z-10">
            <div className="flex justify-between items-center mb-4 px-4">
              <span className="text-sm font-medium text-muted-foreground">Subtotal:</span>
              <span className="text-lg font-semibold">£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="px-4 pb-4">
              <Button className="w-full py-2" onClick={handleCheckout}>
                Checkout
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartPanel;
