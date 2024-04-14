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

// Hàm hỗ trợ lấy khoản giá sản phẩm. Update, Thêm, xoá đơn giá min, max.
export const getPriceQueryParams = (searchParams, key, value) => {
  const hasValueInParam = searchParams.has(key);
  
  if(value && hasValueInParam){
    // Cập nhật giá
    searchParams.set(key, value);
  } else if (value) {
    // Thêm giá
    searchParams.append(key, value)
  } else if (hasValueInParam) {
    // Xoá giá
    searchParams.delete(key);
  }

  return searchParams;
};