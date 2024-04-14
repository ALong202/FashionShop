import './App.css';
// React router DOM quản lý routing. Router xác định các routes. Route: URL path
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home';

import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
// Toast package giúp hiển thị thông báo success, error, warning... https://www.npmjs.com/package/react-hot-toast
import { Toaster } from "react-hot-toast";
import ProductDetails from './component/product/ProductDetails';
import Login from './component/auth/Login'; // auto chèn khi chọn Login từ Quick Fix
// import './custom-theme.min.css';

import Cart from "./component/cart/Cart"
import Shipping from "./component/cart/Shipping"
import ConfirmOrder from './component/cart/ConfirmOrder';
import PaymentMethod from './component/cart/PaymentMethod';



function App() {
  return (
    <Router>
      <div className="App">
      <Toaster position="top-center" />
      {/* Page header từ ./component/layout/Footer */}
      <Header/>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          {/**một số route cần có route cho ac đăng ký và chưa đăng ký */}
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/confirm_order" element={<ConfirmOrder/>} />
          <Route path="/payment_method" element={<PaymentMethod />} />
        </Routes>

      </div>
      

      {/* Page Footer từ ./component/layout/Header*/}
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
