import "./styles.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import CategoryLists from "./pages/CategoryLists/CategoryLists";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";
import Layout from "./component/Layout/Layout";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route element=<Layout />>
          <Route path="/" element=<Home /> />
          <Route path="/product" element=<Product /> />
          <Route path="/product/:category" element=<Product /> />
          <Route path="/product/:category/:id" element=<ProductDetails /> />
          <Route path="/product/:category" element=<CategoryLists /> />
          <Route path="/product/:category/:id" element=<CategoryDetails /> />
          <Route path="/wishlist" element=<Wishlist /> />
          <Route path="/cart" element=<Cart /> />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
