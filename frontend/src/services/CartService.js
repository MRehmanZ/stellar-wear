export const mergeCarts = (guestCart, userCart) => {
  const mergedCart = [...userCart];
  guestCart.forEach(guestItem => {
    const existingItem = mergedCart.find(item => item.id === guestItem.id);
    if (existingItem) {
      existingItem.quantity += guestItem.quantity;
    } else {
      mergedCart.push(guestItem);
    }
  });
  return mergedCart;
};
