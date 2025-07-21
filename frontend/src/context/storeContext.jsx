import { createContext, useContext, useEffect, useState } from "react";
import { product_list } from "../assets/asset";

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  // Use Location for fetch all products

  // To show all the product with filter product also
  const [products] = useState(product_list);
  const [filterProduct, setFilterProduct] = useState(product_list);

  // To define the state value for search, brand, category, sort the product
  const [searchTerm, setSearchTerm] = useState("");
  const [selectCategory, setSelectCategory] = useState([]);
  const [selectBrand, setSelectBrand] = useState([]);
  const [sortProduct, setSortProduct] = useState("default");

  const allPrice = product_list.map((item) => item.price);
  const minPrice = Math.min(...allPrice);
  const maxPrice = Math.max(...allPrice);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  // Update the value using the useEffect

  useEffect(() => {
    // defnied the product list with variable
    let filtered = [...products];

    // update the SearchTerm
    if (searchTerm.trim() !== "") {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        return (
          item.brand.toLowerCase().includes(lowerSearch) ||
          item.category.toLowerCase().includes(lowerSearch)
        );
      });
    }

    // update the Category
    if (selectCategory.length > 0) {
      filtered = filtered.filter((item) => {
        return selectCategory.includes(item.category);
      });
    }

    // update the Brand
    if (selectBrand.length > 0) {
      filtered = filtered.filter((item) => {
        return selectBrand.includes(item.brand);
      });
    }

    // update the price range
    filtered = filtered.filter(
      (item) => item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // update the sort product
    if (sortProduct === "HighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortProduct === "LowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilterProduct(filtered);
  }, [
    products,
    searchTerm,
    selectCategory,
    selectBrand,
    sortProduct,
    priceRange,
  ]);

  const contextValue = {
    products,
    searchTerm,
    selectCategory,
    selectBrand,
    filterProduct,
    setSearchTerm,
    setSelectCategory,
    setSelectBrand,
    setSortProduct,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
