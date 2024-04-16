// 'racfe' để tạo functional component với export

import React from "react"
import { useSelector } from "react-redux"; // auto chèn
import { Link, useNavigate } from "react-router-dom"
import MetaData from "./MetaData";
import Search from "./Search";
import { useGetMeQuery } from "../../redux/api/userApi";

const Header = () => {

  const { isLoading } = useGetMeQuery();
  // console.log(data); // Dữ liệu người dùng đăng nhập từ backend

  const { user } = useSelector((state) => state.auth)

  const navigate = useNavigate();
  const {cartItems} = useSelector((state) => state.cart)
  return (
    // Navigation bar: đặt ở trên cùng của web và chứa ác liên kết hoặc menu giúp người dùng điều hướng, truy cập các phần khác nhau của web
    <>
      <MetaData title={"Chi tiết sản phẩm"} />
        <nav className="navbar row">
        <div className="col-12 col-md-3 ps-5">
          <div className="navbar-brand">
            <a href="/">
              <img src="../images/FashionShop_logo.svg" alt="FashionShop Logo" style={{width: '8em'}}/>
            </a>
          </div>
        </div>
        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Search />
        </div>
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          <a href="/cart" style={{textDecoration: "none"}}>
            <span id="cart" className="ms-3"> Giỏ hàng </span>
            <span className="ms-1" id="cart_count">{cartItems?.length}</span>
          </a>

        {user ? (
          <div className="ms-4 dropdown">
            <button
              className="btn dropdown-toggle text-white"
              type="button"
              id="dropDownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <figure className="avatar avatar-nav">
                <img
                  src="../images/default_avatar.jpg"
                  alt="User Avatar"
                  className="rounded-circle"
                />
              </figure>
              <span>{user?.name}</span>
            </button>
            <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
              <a className="dropdown-item" href="/admin/dashboard"> Dashboard </a>

              <a className="dropdown-item" href="/me/orders"> Đơn hàng </a>

              <a className="dropdown-item" href="/me/profile"> Tài khoản </a>

              <a className="dropdown-item text-danger" href="/"> Đăng xuất </a>
            </div>
          </div>
        ): (
          // Nếu không phải loading status, chỉ hiện nút đăng nhập
          !isLoading && (
            <Link to="/login" className="btn ms-4" id="login_btn"> Đăng nhập </Link>
          )
        )}  

        </div>
      </nav>
    </>
  )
}

export default Header