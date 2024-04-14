//Hàm hõ trợ tính toán giá thanh toán
export const calculateOrderCost = (cartItems) => {
  const itemsPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity, 0
  );

  const shippingPrice = itemsPrice * 0.1;
  const totalPrice = (itemsPrice + shippingPrice);

  return{
    itemsPrice,
    shippingPrice,
    totalPrice,
  };
}