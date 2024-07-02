import React, {useEffect, useState} from 'react'
import MetaData from '../layout/MetaData'
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import { calculateOrderCost } from '../../helpers/helpers'
import { useCreateNewOrderMutation } from '../../redux/api/orderApi'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

import ZaloPayApi from '../../redux/api/zalopayApi'

const PaymentMethod = () => {
  const { user } = useSelector((state) => state.auth)
  
  const [method, setMethod] = useState("")

  const navigate = useNavigate();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);

  const [createNewOrder, {isLoading, error, isSuccess}] = useCreateNewOrderMutation();

  useEffect(() => {    
    if (error) {
      navigate("/cart");
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      navigate("/me/orders?order_success=true");
    }
    if (isLoading){
      toast.warn("Đang tạo đơn hàng trên hệ thống");
    }
  }, [error, isLoading, isSuccess, navigate]);

  
  const submitHandler = (e) => {

    //Ko cho phép để trống hình thức thanh toán
    e.preventDefault();    
    if (method === ""){
      toast.error("Bạn phải chọn hình thức thanh toán");
    }

    const { itemsPrice, shippingPrice, totalPrice } = calculateOrderCost(cartItems);

    // Xử lý mảng cartItems để loại bỏ variant và _id trong selectedVariant
    const processedCartItems = cartItems.map(item => {
      // Loại bỏ thuộc tính variant
      const { variant, ...rest } = item;

      // Loại bỏ thuộc tính _id trong selectedVariant
      const { selectedVariant, ...restItem } = rest;
      const { _id, ...variantWithoutId } = selectedVariant;

      //Trả về đối tượng mới đã xử lý
      return {
        ...restItem,
        selectedVariant: variantWithoutId
      };
    });

    console.log(processedCartItems);

    const orderData = {
      shippingInfo,
      orderItems: processedCartItems,
      itemsPrice, 
      shippingAmount: shippingPrice, 
      totalAmount: totalPrice,
      paymentInfo: {
        status: "Chưa thanh toán"
      },
      paymentMethod: "COD",
      user: user._id,
    };

    console.log(orderData)

    if (method === "COD"){
      //alert("COD");
      createNewOrder(orderData)
    }

    if (method === "Card"){
      //alert("Card");
      ZaloPayApi.createPayment([orderData])
      .then(response => {
        console.log("Day la response\n", response);
        if (response.status === 200)          
          window.location.href = response.data.order_url;
        else
          toast.error("Hệ thống không khả dụng!");
      })
      .catch(e => {
        console.log(e);
      }); 
    }
  }

  return (
    <>
      <MetaData title={"Hình thức thanh toán"} />

      <CheckoutSteps shipping confirmOrder payment/>

      <div className="row wrapper">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"
            onSubmit={submitHandler}
          >
            <h2 className="mb-4">Chọn hình thức thanh toán</h2>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="codradio"
                value="COD"
                onChange={(e) => setMethod("COD")}
              />
              <label className="form-check-label" htmlFor="codradio">
                Thanh toán khi nhận hàng
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="payment_mode"
                id="cardradio"
                value="Card"
                onChange={(e) => setMethod("Card")}
              />
              <label className="form-check-label" htmlFor="cardradio">
                Thanh toán trực tuyến qua cổng ZaloPay
              </label>
            </div>

            <button id="shipping_btn" type="submit" className="btn py-2 w-100">
              XÁC NHẬN THANH TOÁN
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PaymentMethod