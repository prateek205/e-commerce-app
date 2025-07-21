import React from "react";
import "./CartDetail.css";
import { useCart } from "../../context/cartContext";
import { Link } from "react-router-dom";

const CartDetail = () => {
  const {
    cart,
    totalDiscount,
    totalPrice,
    finalAmount,
    addToCart,
    remove,
    decreaseQty,
    itemCount,
    shippingFees,
  } = useCart();

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  return (
    <React.Fragment>
      {cart.length === 0 ? (
        <div className="emptyCart">
          <p>Your Cart is Empty..</p>
          <Link to="/product">
            <button>Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className="cart_content">
          <div className="cart_content_details">
            <div className="cart_content_menu">
              <div className="cartContentMenuList">
                <div className="cart_content_heading">
                  <p>e-Mall ({itemCount})</p>
                </div>
                <div className="cart_content_main">
                  {cart.map((item, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div className="cart_content_list">
                          <div className="cartImg">
                            <img src={item.images} alt="" />
                          </div>
                          <div className="cartDetails">
                            <h2>{item.title}</h2>
                            <div className="cartPriceDetails">
                              <p className="cart_orgPrice">
                                {formatCurrency(item.price)}
                              </p>
                              <p className="cart_disPrice">
                                {formatCurrency(
                                  item.price -
                                    (item.price * item.discount) / 100
                                )}
                              </p>
                              <p className="cartDiscount">
                                {item.discount}% off
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="cart_content_qty_detail">
                          <div className="cart_content_qty">
                            <button
                              onClick={() => {
                                decreaseQty(item._id);
                              }}
                            >
                              <i className="fa-solid fa-minus"></i>
                            </button>
                            <div className="count">{item.quantity}</div>
                            <button
                              onClick={() => {
                                addToCart(item);
                              }}
                            >
                              <i className="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div className="cart_content_remove">
                            <button
                              onClick={() => {
                                remove(item._id);
                              }}
                              className="remove"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
              <div className="placeOrderFooter">
                <button>Place Order</button>
              </div>
            </div>
            <div className="cart_content_price">
              <div className="cart_content_price_heading">
                <p>Price Details</p>
              </div>
              <div className="cart_price_list">
                <div className="cartMainPrice">
                  <p>Price Item ({itemCount})</p>
                  <p>{formatCurrency(totalPrice)}</p>
                </div>
                <div className="cartDiscountPrice">
                  <p>Discount</p>
                  <p className="discounted">-{formatCurrency(totalDiscount)}</p>
                </div>
                <div className="cartShipping">
                  <p>Shipping Fee</p>
                  <p>
                    {shippingFees <= 1000
                      ? "Free"
                      : formatCurrency(shippingFees)}
                  </p>
                </div>
              </div>
              <div className="cart_total_price">
                <div className="cartTotal">
                  <p>Total Amount</p>
                  <p>{formatCurrency(finalAmount)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default CartDetail;
