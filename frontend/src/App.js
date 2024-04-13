import './App.css';
// React router DOM quản lý routing. Router xác định các routes. Route: URL path
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './component/Home';

import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
// Toast package giúp hiển thị thông báo success, error, warning... https://www.npmjs.com/package/react-hot-toast
import { Toaster } from "react-hot-toast";
import ProductDetails from './component/product/ProductDetails';
// import './custom-theme.min.css';



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
        </Routes>

      </div>
      

      {/* Page Footer từ ./component/layout/Header*/}
      <Footer/>
    </div>
    </Router>
    
  );
}

export default App;
