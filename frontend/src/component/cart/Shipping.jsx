import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { saveShippingInfo } from "../../redux/features/cartSlice";
import CheckoutSteps from './CheckoutSteps';
//import CheckoutSteps from './CheckoutSteps';


const Shipping = () => {

  const { user } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(user?.address);
  //const [city, setCity] = useState("");
  //const [zipCode, setZipCode] = useState("");
  const [phoneNo, setPhoneNo] = useState(user?.phone);
  //const [country, setCountry] = useState("");

  const { shippingInfo } = useSelector((state) => state.cart);

  //Hook để render lại khi sửa thông tin vận chuyển
  useEffect(() => {
    if (shippingInfo) {
      setAddress(shippingInfo?.address);
      //setCity(shippingInfo?.city);
      //setZipCode(shippingInfo?.zipCode);
      setPhoneNo(shippingInfo?.phoneNo);
      //setCountry(shippingInfo?.country);
    }
    else{
      setAddress(user?.address);
      setPhoneNo(user?.phone);
    }
  }, [shippingInfo]);

  const [orderID, setOrderID] = useState(user?._id + Date.now()); //Tạo orderID là ID người dùng+timestamp

  const submitHanler = (e) => {
    //Cho phép dùng giá trị mặc định nên comment
    //e.preventDefault();    
    dispatch(saveShippingInfo({orderID, address, phoneNo}));
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title = {"Thông tin vận chuyển"} />

      <CheckoutSteps shipping />
      
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form
            className="shadow rounded bg-body"

            onSubmit={submitHanler}
          >
            <h2 className="mb-4">Thông tin vận chuyển</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">Địa chỉ</label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/*<div className="mb-3">
              <label htmlFor="city_field" className="form-label">Tỉnh/Thành phố</label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>*/}

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">Điện thoại liên hệ</label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>

            {/*<div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">Zip Code</label
              >
              <input
                type="number"
                id="zip_code_field"
                className="form-control"
                name="postalCode"
                value=""
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">Country</label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                required
              >
                <option value="Country1">Country1</option>
                <option value="Country2">Country2</option>
              </select>
            </div>*/}

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              Tiếp tục thanh toán
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping