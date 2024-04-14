import React from "react";
import MetaData from "../layout/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";


const Cart =() => {
  const dispatch = useDispatch();

  const {cartItems} = useSelector((state) => state.cart);

  const navigate = useNavigate();

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1

    if (newQty >= item?.stock)
      return;
    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity -1

    if (newQty <= 0)
      return;
    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty
    };

    dispatch(setCartItem(cartItem));
  };

  //Hàm xử lý khi xóa sản phẩm trong giỏ
  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  //Hàm xử lý khi chuyển sang kiểm tra vận chuyển
  const checkoutHandler = () => {
    navigate("/shipping");
  };


  return (
    <>
      <MetaData title={"Giỏ Hàng"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Chưa thêm mặt hàng nào vào giỏ</h2>
      ) : (
        <>
        <h2 className="mt-5">Mặt hàng trong giỏ: <b>{cartItems?.length} mặt hàng</b></h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems?.map((item) => (
              <>
              <hr />
              <div className="cart-item" data-key="product1">
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item?.image}
                      alt="FashionShop"
                      height="90"
                      width="115"
                    />
                  </div>
                  <div className="col-5 col-lg-3">
                    <Link to={`/products/${item?.product}`}> {item?.name} </Link>
                  </div>
                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">{item?.price}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      {/*Thêm onClick và hàm giảm số lượng trong giỏ ở đây */}
                      <span className="btn btn-danger minus" onClick={() => decreseQty(item, item.quantity)}> - </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item?.quantity}
                        readonly
                      />
                      {/*Thêm onClick và hàm tăng số lượng trong giỏ ở đây */}
                      <span className="btn btn-primary plus" onClick={() => increseQty(item, item.quantity)}> + </span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    {/*Thêm onClick và hàm xử lý khi xóa sản phẩm trong giỏ ở đây */}
                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item?.product)}></i>
                  </div>
                </div>
              </div>
              <hr />
              </>
            ))}

          </div>
          <div className="col-12 col-lg-3 my-4">
            <div id="order_summary">
              <h4>Thông tin thanh toán</h4>
              <hr />
              {
              /*Xử lý thông tin số lượng trong giỏ hàng tại đây */}
              <p>Số lượng sản phẩm: <span className="order-summary-values"> {cartItems?.reduce((acc,item) => acc + item?.quantity, 0)} </span></p>
              {/*Xử lý thông tin thanh toán giỏ hàng tịa đây */}
              <p>Tổng tiền tạm tính: <span className="order-summary-values">{cartItems?.reduce((acc,item) => acc + item?.quantity * item.price, 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></p>
              <hr />
              {/*Thêm onClick và hàm xử lý khi chuyển sang trang thanh toán ở đây */ }
              <button id="checkout_btn" className="btn btn-primary w-100" onClick={checkoutHandler}>
                Thanh toán
              </button>
            </div>
          </div>
        </div>
        </>
      )}
      
    </>
  );
};

export default Cart