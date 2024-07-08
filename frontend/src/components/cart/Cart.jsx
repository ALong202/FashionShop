import React, { useState } from "react";
import MetaData from "../layout/MetaData"
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";
import { colorMap } from "../../constants/constants";
//import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { toast } from "react-toastify";

const Cart =() => {
  const dispatch = useDispatch();

  const {cartItems} = useSelector((state) => state.cart); //Danh sách sản phẩm đang lưu tạm trên browser (Local Storage)

  const navigate = useNavigate();

  // const [quantity, setQuantity] = useState(1); // quantity: số lượng sản phẩm
  // const [selectedSize, setSelectedSize] = useState(null); // size: kích cỡ sản phẩm
  // const [selectedColor, setSelectedColor] = useState(null); // color: màu sắc sản phẩm
  
  //Xử lý khi thay đổi color
  const handleColorChange = (item, color) => {
    const newSelectedVariant = item?.variant.find((variant) => variant.color === color && variant.size === item?.selectedVariant?.size);
    const newItem = {
      ...item,
      selectedVariant: newSelectedVariant
    };

    //Loại của sản phẩm không còn hàng thì báo lỗi và return
    if(newItem?.selectedVariant?.stock === 0 ){
      toast.error("Hết hàng");
      return;
    }
    //Loại của sản phẩm còn hàng nhưng không nhập gì vào ô số lượng thì thêm vào giỏ với số lượng là 1
    else if (newItem?.quantity === ""){
      dispatch(removeCartItem(item));
      setItemToCart(newItem, 1);
    }

    dispatch(removeCartItem(item));
    setItemToCart(newItem, newItem?.quantity)
  }

  //Xử lý khi thay đổi size =>logic tương tự size
  const handleSizeClick = (item, size) => {
    const newSelectedVariant = item?.variant.find((variant) => variant.size === size && variant.color === item?.selectedVariant?.color);
    const newItem = {
      ...item,
      selectedVariant: newSelectedVariant
    };

    if(newItem?.selectedVariant?.stock === 0 ){
      toast.error("Hết hàng");
      return;
    }      
    else if (newItem?.quantity === ""){
      dispatch(removeCartItem(item));
      setItemToCart(newItem, 1);
    }

    dispatch(removeCartItem(item));
    setItemToCart(newItem, newItem?.quantity)
  };

  //Xử lý khi chọn tăng số lượng => đã cài logic ở cartSlice nên ko check nữa, tăng quá tồn thì đưa về tồn
  const increseQty = (item, quantity) => {
    //const newQty = quantity + 1

    if (quantity >= item?.selectedVariant?.stock)
      return;
    setItemToCart(item, 1);
  };

  //Xử lý khi chọn giảm số lượng => đã cài logic ở cartSlice nên ko check nữa, giảm quá 1 thì đưa về 1
  const decreseQty = (item, quantity) => {
    //const newQty = quantity -1

    if (quantity <= 1){
      //dispatch(removeCartItem(item));
      return;
    }
    setItemToCart(item, -1);
  };

  //Xử lý khi đổi số lượng manual
  const changeQty = (item, quantity) => {
    dispatch(removeCartItem(item));
    setItemToCart(item, quantity);
  };

  //Hàm set thông tin mặt hàng trong giỏ
  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      variant: item?.variant,
      selectedVariant: item?.selectedVariant,
      quantity: newQty
    };

    dispatch(setCartItem(cartItem));
    if(cartItem.quantity !== "")
      toast.success("sửa thành công");

    console.log(cartItem);
  };

  //Hàm xử lý khi xóa sản phẩm trong giỏ
  const removeCartItemHandler = (item) => {
    dispatch(removeCartItem(item));
  };

  //Hàm xử lý khi chuyển sang kiểm tra vận chuyển
  const checkoutHandler = () => {
    if (cartItems.find((i) => i?.quantity === "")){
      toast.error("Các mặt hàng phải có số lượng");
      return;
    }
    navigate("/shipping");
  };


  return (
    <>
      <MetaData title={"Giỏ Hàng"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5">Quý khách chưa chọn mặt hàng nào</h2>
      ) : (
        <>
        <h2 className="mt-5">Mặt hàng trong giỏ: <b>{cartItems?.length} mặt hàng</b></h2>
        <div className="row d-flex justify-content-between">
          <div className="col-12 col-lg-8">
            {cartItems?.map((item) => (
              <>
              {/* <hr /> */}
              <div id="order_summary" className="cart-item" data-key="product1">
                <div className="row">
                  <div className="col-4 col-lg-3">
                    <img
                      src={item?.image}
                      alt="FashionShop"
                      height="180"
                      width="100"
                    />
                  </div>

                  <div className="col-5 col-lg-3">
                    <Link to={`/product/${item?.product}`}> {item?.name} </Link>
                    <p>Màu sắc:
                      <div className="color-chooser">
                        {item?.variant
                          .map(variant => variant.color) // Extract color from each variant
                          .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicate colors
                          .map((colorName) => ( // Nếu item.color không tồn tại thì trả về mảng rỗng
                          <button
                            key={colorName}
                            style={{ backgroundColor: colorMap[colorName] }}
                            className={`color-button ${item?.selectedVariant?.color === colorName ? 'color-button-selected' : ''}`}
                            onClick={() => handleColorChange(item, colorName)}
                          >
                            {colorName}
                          </button>
                        ))}
                      </div>
                    </p>

                    <p>Kích thước: 
                      <div className="size-buttons">
                        {item?.variant
                          .filter(variant => variant.color === item?.selectedVariant?.color) // Filter variants by selected color
                          .map(variant => variant.size) // Extract size from each variant
                          .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicate sizes
                          .map((size) => (
                          <button 
                            key={size} 
                            onClick={() => handleSizeClick(item, size)}
                            // Cập nhật trạng thái khi size button được nhấn, sau đó thêm class selected vào button khi render lại component
                            className={`size-button ${item?.selectedVariant?.size === size ? 'selected' : ''}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                  </p>
                  </div>

                  

                  <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p id="card_item_price">{item?.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                  </div>
                  <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <div className="stockCounter d-inline">
                      {/*Thêm onClick và hàm giảm số lượng trong giỏ ở đây */}
                      <span className="btn btn-danger minus" onClick={() => decreseQty(item, item.quantity)}> - </span>
                      <input
                        type="number"
                        className="form-control count d-inline"
                        value={item?.quantity}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            changeQty(item, value);
                          }
                          else if (value < 0 )
                            changeQty(item, 1);
                          else if (value === 0)
                            return;
                          else
                            changeQty(item, e.target.value);
                        }}
                      />
                      {/*Thêm onClick và hàm tăng số lượng trong giỏ ở đây */}
                      <span className="btn btn-primary plus" onClick={() => increseQty(item, item.quantity)}> + </span>
                    </div>
                  </div>
                  <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                    {/*Thêm onClick và hàm xử lý khi xóa sản phẩm trong giỏ ở đây */}
                    <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item)}></i>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
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
                Đặt hàng
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