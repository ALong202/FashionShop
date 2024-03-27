import React from 'react'

const Header = () => {
  return (
    // Navigation bar: đặt ở trên cùng của web và chứa ác liên kết hoặc menu giúp người dùng điều hướng, truy cập các phần khác nhau của web
    <nav className="navbar row">
      <div className="col-12 col-md-3 ps-5">
        <div className="navbar-brand">
          <a href="/">
            <img src="../images/FashionShop_logo.svg" alt="FashionShop Logo" style={{width: '8em'}}/>
          </a>
        </div>
      </div>
      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <form action="your_search_action_url_here" method="get">
          <div className="input-group">
            <input
              type="text"
              id="search_field"
              aria-describedby="search_btn"
              className="form-control"
              placeholder="Nhập tên sản phẩm ..."
              name="keyword"
              value=""
            />
            <button id="search_btn" className="btn" type="submit">
              <i className="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
        <a href="/cart" style={{textDecoration: "none"}}>
          <span id="cart" className="ms-3"> Giỏ hàng </span>
          <span className="ms-1" id="cart_count">0</span>
        </a>

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
            <span>Guest</span>
          </button>
          <div className="dropdown-menu w-100" aria-labelledby="dropDownMenuButton">
            <a className="dropdown-item" href="/admin/dashboard"> Dashboard </a>

            <a className="dropdown-item" href="/me/orders"> Đơn hàng </a>

            <a className="dropdown-item" href="/me/profile"> Tài khoản </a>

            <a className="dropdown-item text-danger" href="/"> Đăng xuất </a>
          </div>
        </div>

        <a href="/login" className="btn ms-4" id="login_btn"> Đăng nhập </a>
      </div>
    </nav>
  )
}

export default Header