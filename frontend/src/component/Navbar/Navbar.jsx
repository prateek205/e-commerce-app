import { useEffect, useState } from "react";
import { assets } from "../../assets/asset";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useStore } from "../../context/storeContext";
import { useCart } from "../../context/cartContext";

const Navbar = () => {
  const { cart, wishList } = useCart();
  const { products } = useStore();

  const [searchText, setSearchText] = useState("");
  const [suggestion, setSuggestion] = useState([]);
  const { setSearchTerm } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [toggleAccount, setToggleAccount] = useState(false);

  const handleToggleAccount = () => {
    setToggleAccount((prev) => !prev);
  };

  const handleNavigation = (path)=>{
    setToggleAccount(false)
    navigate(path)
  }

  useEffect(() => {
    if (location.pathname === "/") setSearchTerm("");
    setSearchText("");
  }, [location.pathname, setSearchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchText);
    navigate("/product");
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setSuggestion([]);
      return;
    }

    const filtered = products.filter((product) => {
      return (
        product.brand.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setSuggestion(filtered.slice(0, 5));
  }, [searchText, products]);

  const handleSuggestionSearch = (brand) => {
    setSearchText(brand);
    handleSearch();
  };

  const Item = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img src={assets.logo} alt="" className="logo" />
        </Link>

        <div className="nav-address">
          <span className="address">Deliver to</span>
          <span className="location">India</span>
        </div>

        <div className="navbar_search_bar">
          <Link to="/product">
            <span className="all">All</span>
          </Link>
          <input
            type="text"
            placeholder="Search eMall.in"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <span>
            <img
              src={assets.search}
              value={searchText}
              onClick={handleSearch}
            />
          </span>
          {suggestion.length > 0 && (
            <ul className="suggestionList">
              {suggestion.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => handleSuggestionSearch(item.brand)}
                  >
                    {item.brand}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="navbar-right">
          <div className="language">
            <img src={assets.india} alt="" />
            <span className="lan">En</span>
          </div>

          <div className="nav-account">
            <div className="account">
              <span className="strong">Hello, Sign-In</span>
              <span className="bold">Account & Lists</span>
            </div>
            <div className="down-arrow" onClick={handleToggleAccount}>
              <i className="fa-solid fa-arrow-down"></i>
            </div>
            {toggleAccount && (
              <div className="accountList" onClick={(e)=> e.stopPropagation()}>
                <ul className="ac-item">
                  <li>Your Account</li>
                  <li onClick={()=> handleNavigation("/wishlist")}>Your Wishlist</li>
                  <li>Logout</li>
                </ul>
              </div>
            )}
          </div>

          <div className="navbar_wish_icon">
            <span className="ret">Returns</span>
            <span className="or">& Orders</span>
          </div>

          <Link to="/cart">
            <div className="navbar_cart_icon">
              <img src={assets.bag} alt="" className="icon" />
              <span className="count">{Item}</span>
              <span className="crt">Cart</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
