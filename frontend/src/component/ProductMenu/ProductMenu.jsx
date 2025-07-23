import React, { useEffect, useState } from "react";
import "./ProductMenu.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useStore } from "../../context/storeContext";
import { Link, useLocation } from "react-router-dom";

const ProductMenu = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectCategory = searchParams.get("category");
  const selectBrand = searchParams.get("brand");
  const categoryParams = selectCategory ? selectCategory.split(",") : [];
  const brandParams = selectBrand ? selectBrand.split(",") : [];
  const { filterProduct } = useStore();
  const filteredList = filterProduct

  const filterByCategoryAndBrand = filteredList.filter((product) => {
    const matchCategory =
      categoryParams.length > 0
        ? categoryParams.includes(product.category?.toLowerCase())
        : true;

    const matchBrand =
      brandParams.length > 0
        ? brandParams.includes(product.brand?.toLowerCase())
        : true;

    return matchCategory && matchBrand;
  });

  const initialCount = 18;
  const [showProduct, setShowProduct] = useState(
    filteredList.slice(0, initialCount)
  );

  useEffect(() => {
    setShowProduct(filteredList.slice(0, initialCount));
  }, [filteredList]);

  const loadMore = () => {
    const nextItem = filterByCategoryAndBrand.slice(
      showProduct.length,
      showProduct.length + initialCount
    );

    setTimeout(() => {
      setShowProduct((prev) => [...prev, ...nextItem]);
    }, 1000);
  };

  return (
    <React.Fragment>
      <InfiniteScroll
        dataLength={showProduct.length}
        next={loadMore}
        hasMore={showProduct.length < filterByCategoryAndBrand.length}
        loader={<h4 className="loadMore_btn">Loading...</h4>}
      >
        <div className="product_menu_list">
          {showProduct.map((item, index) => {
            const hasDiscount = item.discount > 0;

            const discountPrice =
              item.price - (item.price * item.discount) / 100;

            const formatCurrency = (value) =>
              new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }).format(value);

            return (
              <React.Fragment key={index}>
                <div className="product_menu_item">
                  <div className="product_menu_item_img">
                    <img src={item.images} alt="" />
                  </div>
                  <div className="product_menu_content">
                    <Link to={`/product/${item.category}/${item.brand}/${item._id}`}>
                      <div className="product_menu_heading">
                        <h2>{item.title.slice(0, 120)}</h2>
                      </div>
                    </Link>
                    {hasDiscount ? (
                      <>
                        <div className="product_item_price">
                          <p className="discount_price">
                            {formatCurrency(discountPrice)}
                          </p>
                          <span className="mrp"> M.R.P.: </span>
                          <p className="org_price">
                            {formatCurrency(item.price)}
                          </p>
                          <p className="discount">{item.discount}% off</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="product_item_price">
                          <p className="main_price">
                            {formatCurrency(item.price)}
                          </p>
                        </div>
                      </>
                    )}
                    {item.specifications?.length > 0 && (
                      <ul className="specifications">
                        {item.specifications.map((items, index) => {
                          return <li key={index}>{items}</li>;
                        })}
                      </ul>
                    )}
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </InfiniteScroll>
    </React.Fragment>
  );
};

export default ProductMenu;
