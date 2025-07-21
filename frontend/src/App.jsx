import "./styles.css";
import Navbar from "./component/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import Footer from "./component/Footer/Footer";
import ProductDetails from "./pages/productDetails/ProductDetails.jsx";
import Scrolling from "./Helper/Scrolling/Scrolling.jsx";
import ScrollTop from "./component/ScrollTop/ScrollTop.jsx";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Scrolling />
      <ScrollTop />
      <Routes>
        <Route path="/" element=<Home /> />
        <Route path="/product" element=<Product /> />
        <Route path="/product/:id" element=<ProductDetails /> />
        <Route path="/wishlist" element=<Wishlist /> />
        <Route path="/cart" element=<Cart /> />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
