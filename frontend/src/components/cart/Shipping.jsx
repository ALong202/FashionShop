import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import CheckoutSteps from "./CheckoutSteps";
import moment from "moment";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast } from "react-toastify";
import { useGetAddressDataQuery } from "../../redux/api/addressApi";

const Shipping = () => {
  // const { data } = useGetAddressDataQuery();
  // console.log("data tinh thanh", data);
  const nationData = JSON.parse(sessionStorage.getItem("nationData"));
  // console.log("nationData", nationData);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  //const [orderID, setOrderID] = useState(user?._id + Date.now()); //Tạo orderID trong shipping là ID người dùng+timestamp
  const [orderID, setOrderID] = useState(
    moment().format("YYMMDDHHMMSS") + user?._id
  ); //Tạo orderID trong shipping là YYMMDDHHMMSS_user._id -> phù hợp cho zalopay sử dụng

  /*Điền sẵn thông tin từ shippingInfo nếu đã có trên local strorage của kh.
  Nếu chưa có thì dùng thông tin mặc định từ tài khoản*/
  const [shippingVender, setShippingVender] = useState(
    shippingInfo?.shippingVender || "Chọn đơn vị vận chuyển"
  );
  const [shippingProvince, setShippingProvince] = useState(
    shippingInfo?.shippingProvince || "Chọn Tỉnh/Thành Phố"
  );
  const [shippingCity, setShippingCity] = useState(
    shippingInfo?.shippingCity || "Chọn Quận/Huyện"
  );
  const [shippingWard, setShippingWard] = useState(
    shippingInfo?.shippingWard || "Chọn Phường/Xã"
  );

  const [address, setAddress] = useState(
    shippingInfo?.address || user?.address
  );
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || user?.phone);

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^\+\d{11}$/;
    return regex.test(phoneNumber);
  };

  const submitHanler = (e) => {
    if(!validatePhoneNumber(phoneNo)){
      toast.error("Số điện thoại không đúng định dạng");
      return;
    }

    if (
      shippingVender === "Chọn đơn vị vận chuyển" ||
      shippingProvince === "Chọn Tỉnh/Thành Phố" ||
      shippingCity === "Chọn Quận/Huyện" ||
      shippingWard === "Chọn Phường/Xã"
    ) {
      toast.error("Các thông tin phải đầy đủ và chính xác");
      return;
    }
    //e.preventDefault(); //cho phép dùng giá trị mặc định trên các trường thông tin
    //Lưu lại shippingInfo với thông số mặc định hoặc thay đổi (nếu có) khi chọn xác nhận thông tin
    dispatch(
      saveShippingInfo({
        orderID,
        address,
        phoneNo,
        shippingVender,
        shippingProvince,
        shippingCity,
        shippingWard,
      })
    );
    navigate("/confirm_order");
  };

  return (
    <>
      <MetaData title={"Thông tin vận chuyển"} />

      <CheckoutSteps shipping />

      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={submitHanler}>
            <h2 className="mb-4">Thông tin vận chuyển</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Đơn vị vận chuyển
              </label>
              <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control form-select "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ "text-align": "left" }}
                >
                  {shippingVender}
                </button>
                <ul className="dropdown-menu" style={{ width: "100%" }}>
                  <li>
                    <button
                      class="dropdown-item"
                      type="button"
                      value="Giao hàng nhanh"
                      onClick={(e) => setShippingVender(e.target.value)}
                    >
                      Giao hàng nhanh
                    </button>
                  </li>
                  <li>
                    <button
                      class="dropdown-item"
                      type="button"
                      value="Giao hàng tiết kiệm"
                      onClick={(e) => setShippingVender(e.target.value)}
                    >
                      Giao hàng tiết kiệm
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Tỉnh/Thành phố
              </label>
              <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control form-select "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ "text-align": "left" }}
                >
                  {shippingProvince}
                </button>
                <ul
                  className="dropdown-menu"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {nationData &&
                    nationData.map((nd) => (
                      <li>
                        <button
                          class="dropdown-item"
                          type="button"
                          value={nd?.Name}
                          onClick={(e) => {
                            setShippingProvince(e.target.value);
                            setShippingCity("Chọn Quận/Huyện");
                            setShippingWard("Chọn Phường/Xã");
                          }}
                        >
                          {nd?.Name}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Quận/Huyện
              </label>
              <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control form-select "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ "text-align": "left" }}
                >
                  {shippingCity}
                </button>
                <ul
                  className="dropdown-menu"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {shippingProvince !== "Chọn Tỉnh/Thành Phố" ? (
                    nationData
                      .find((i) => i.Name === shippingProvince)
                      .Districts.map((nd) => (
                        <li>
                          <button
                            class="dropdown-item"
                            type="button"
                            value={nd?.Name}
                            onClick={(e) => {
                              setShippingCity(e.target.value);
                              setShippingWard("Chọn Phường/Xã");
                            }}
                          >
                            {nd?.Name}
                          </button>
                        </li>
                      ))
                  ) : (
                    <li>
                      <button
                        class="dropdown-item"
                        type="button"
                        value={shippingCity}
                        disabled={true}
                      >
                        {shippingCity}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Phường/Xã
              </label>
              <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control form-select "
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ "text-align": "left" }}
                >
                  {shippingWard}
                </button>
                <ul
                  className="dropdown-menu"
                  style={{
                    width: "100%",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {shippingCity !== "Chọn Quận/Huyện" ? (
                    nationData
                      .find((i) => i.Name === shippingProvince)
                      .Districts.find((j) => j.Name === shippingCity)
                      .Wards.map((nd) => (
                        <li>
                          <button
                            class="dropdown-item"
                            type="button"
                            value={nd?.Name}
                            onClick={(e) => setShippingWard(e.target.value)}
                          >
                            {nd?.Name}
                          </button>
                        </li>
                      ))
                  ) : (
                    <li>
                      <button
                        class="dropdown-item"
                        type="button"
                        value={shippingWard}
                        disabled={true}
                      >
                        {shippingWard}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Địa chỉ
              </label>
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

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Điện thoại liên hệ
              </label>
              <div>
                <PhoneInput
                  inputStyle={{ width: "100%" }}
                  country={"vn"}
                  countryCodeEditable={false}
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e)}
                />
              </div>

              {/* <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              /> */}
            </div>
            <button
              id="shipping_btn"
              type="submit"
              className="btn w-100 py-2"
              // disabled={
              //   shippingVender === "Chọn đơn vị vận chuyển" ||
              //   shippingProvince === "Chọn Tỉnh/Thành Phố" ||
              //   shippingCity === "Chọn Quận/Huyện" ||
              //   shippingWard === "Chọn Phường/Xã"
              // }
            >
              Tiếp tục thanh toán
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
