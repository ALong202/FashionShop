import React, { useEffect, useState } from "react"
import { useLoginMutation } from "../../redux/api/authApi"; // auto chèn khi chọn useLoginMutation từ Quick Fix
import toast from "react-hot-toast"; // auto chèn khi chọn toast từ Quick Fix

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading, error, data }] = useLoginMutation();
  
  console.log("=====================================");
  console.log(data);
  console.log("=====================================");

  useEffect(() => {
    if(error){
      toast.error(error?.data?.message || "Đã có lỗi xảy ra, vui lòng thử lại");
    }
  })

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch login'
    const loginData = {
      email,
      password,
    };

    login(loginData);
  
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form
          className="shadow rounded bg-body"
          onSubmit={submitHandler}
          action="your_submit_url_here"
          method="post"
        >
          <h2 className="mb-4">Đăng nhập</h2>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">Email</label>
            <input
              type="email"
              id="email_field"
              className="form-control"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">Mật khẩu</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <a href="/password/forgot" className="float-end mb-4">Quên Mật khẩu?</a>

          <button 
            id="login_button" 
            type="submit" 
            className="btn w-100 py-2" 
            disabled={isLoading}
            >
            {isLoading? "Đang xác thực..." :"ĐĂNG NHẬP"}
          </button>

          <div className="my-3">
            <a href="/register" className="float-end">Chưa có tài khoản?</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login