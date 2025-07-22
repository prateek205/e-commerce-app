import React, { useState } from "react";
import "./ProdList.css";
import ProductMenu from "../ProductMenu/ProductMenu";
import { useStore } from "../../context/storeContext";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import Breadscrum from "../../Helper/breadscrum/Breadscrum";
import { useNavigate } from "react-router-dom";

const ProdList = () => {
  const brands = [
    "Apple",
    "Dell",
    "Hp",
    "Redmi",
    "Oneplus",
    "Samsung",
    "Haier",
    "IFB",
    "Sony",
    "Lg",
    "Llyod",
    "Panasonic",
    "Voltas",
    "Xiaomi",
    "Protronics",
    "Ambrane",
    "Boult",
    "Noise",
    "JBL",
    "Godrej",
  ];

  const category = [
    "Appliances",
    "Accessories",
    "Laptops",
    "Smartphones",
    "Smartwatches",
  ];

  const navigate = useNavigate();

  const [showAllBrands, setShowAllBrands] = useState(false);
  const brandLimit = 5;

  const visibleBrand = showAllBrands ? brands : brands.slice(0, brandLimit);

  const {
    products,
    selectCategory,
    selectBrand,
    filterProduct,
    setSelectCategory,
    setSelectBrand,
    setSortProduct,
    setPriceRange,
    priceRange,
    minPrice,
    maxPrice,
  } = useStore();

  // handle the check and uncheck brand and Category

  const filterByCategoryAndBrand = filterProduct.filter((product) => {
    const matchCategory =
      selectCategory.length > 0
        ? selectCategory.some(
            (cat) => cat.toLowerCase() === product.category.toLowerCase()
          )
        : true;

    const matchBrand =
      selectBrand.length > 0
        ? selectBrand.some(
            (brand) => brand.toLowerCase() === product.brand.toLowerCase()
          )
        : true;

    return matchCategory && matchBrand;
  });

  const handleCategoryChange = (category) => {
    setSelectCategory((prev) => {
      const update = prev.includes(category)
        ? prev.filter((b) => b !== category)
        : [...prev, category];

      if (update.length === 0) {
        navigate("/product");
      } else {
        navigate(`/product/${update[0]}`);
      }

      return update;
    });
  };

  const handleBrandChange = (brand) => {
    setSelectBrand((prev) => {
      return prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand];
    });
  };

  return (
    <React.Fragment>
      <div className="productList">
        <div className="product_list_left">
          <div className="product_list_content">
            <div className="filter_cat_List">
              <h3>Category</h3>
              <ul className="filter_cat_menu">
                {category.map((item) => {
                  return (
                    <label key={item}>
                      <li>
                        <input
                          type="checkbox"
                          checked={selectCategory.includes(item)}
                          onChange={() => handleCategoryChange(item)}
                          name={item}
                        />
                        {item}
                      </li>
                    </label>
                  );
                })}
              </ul>
            </div>
            <div className="filter_price_section">
              <h3>Price</h3>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step="1"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([minPrice, Number(e.target.value)])
                }
              />
              <p>
                Price: &#8377;{minPrice} - &#8377;{priceRange[1]}
              </p>
            </div>
            <div className="filter_brand_menu">
              <h3>Brand</h3>
              <ul className="filter_brand_list">
                {visibleBrand.map((brand, index) => {
                  return (
                    <label key={index}>
                      <li>
                        <input
                          type="checkbox"
                          checked={selectBrand.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                          name={brand}
                        />
                        {brand}
                      </li>
                    </label>
                  );
                })}
              </ul>
              {brands.length > brandLimit && (
                <button
                  onClick={() => setShowAllBrands(!showAllBrands)}
                  className="load_btn"
                >
                  {showAllBrands ? "Show Less" : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="product_list_right">
          <div className="breadscrums">
            <Breadscrum />
          </div>
          <div className="allProd">
            <p>
              All Products: <span> {filterByCategoryAndBrand.length} </span>{" "}
              Items out of <span>{products.length}</span> Items
            </p>
          </div>
          <div className="product_sort_list">
            <p>Sort by: </p>
            <button onClick={() => setSortProduct("default")}>All</button>
            <button onClick={() => setSortProduct("LowToHigh")}>
              Price - - Low to High
            </button>
            <button onClick={() => setSortProduct("HighToLow")}>
              Price - - High to Low
            </button>
          </div>
          <hr />
          <div className="product_menu_list">
            <ProductMenu />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProdList;
