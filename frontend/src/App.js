// import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Footer from "./component/layout/Footer";
import Header from "./component/layout/Header";
// import './custom-theme.min.css';



function App() {
  return (
    <div className="App">
      {/* Page header từ ./component/layout/Footer */}
      <Header/>

      <div className="container">
        <Home/>
      </div>
      

      
  

      {/* Page Footer từ ./component/layout/Header*/}
      <Footer/>
    </div>
  );
}

export default App;
