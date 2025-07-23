import React from "react";
import "./ProductSection.css";
import { brand_menu_list, product_menu } from "../../assets/asset";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../context/storeContext";

const ProductSection = () => {
  const navigate = useNavigate();

  const {setSelectCategory, setSelectBrand} = useStore()

  const handleClickCategory = (category) => {
    setSelectCategory([category.toLowerCase()])
    navigate(`/product?category=${category.toLowerCase()}`);
  };

  const handleClickBrand = (brand) => {
    setSelectBrand([brand.toLowerCase()])
    navigate(`/product?brand=${brand.toLowerCase()}`);
  };

  return (
    <React.Fragment>
      <div className="product_category">
        <h2>Explore Products</h2>
        <div className="product_item">
          {product_menu.map((item, index) => {
            return (
              <div
                key={index}
                className="product_list"
                onClick={() => handleClickCategory(item.category)}
              >
                <img src={item.product_image} alt="" className="product_img" />
                <p>{item.product_name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="product_brand">
        <h2>Shop by Brands</h2>
        <div className="product_brand_list">
          {brand_menu_list.map((item, index) => {
            return (
              <div
                key={index}
                className="product_brand_menu"
                onClick={() => handleClickBrand(item.brand_name)}
              >
                <img src={item.brand_image} alt="" />
                <p>{item.brand_name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductSection;
