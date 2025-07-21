import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { useParams, Link } from "react-router-dom";
import { useStore } from "../../context/storeContext";
import { useCart } from "../../context/cartContext";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const product = products.find((p) => p._id === id);
  const [selectImage, setSelectImage] = useState(product?.productImage?.[0]);

  const hasDiscount = product.discount > 0;

  const discountPrice =
    product.price - (product.price * product.discount) / 100;

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  return (
    <React.Fragment>
      <div className="productDetail">
        <div className="productDetailContainer">
          <div className="productDetailContainerLeft">
            <div className="productDetailContainerImgLeft">
              {product.productImage.map((img, index) => {
                return (
                  <img
                    key={index}
                    onClick={() => setSelectImage(img)}
                    onMouseEnter={() => setSelectImage(img)}
                    className={selectImage === img ? "activeProduct" : ""}
                    src={img}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="main_add_section">
              <div className="productDetailContainerImgRight">
                <Zoom>
                  <img src={selectImage} alt="" width="300" />
                </Zoom>
              </div>
              <div className="addCart_buyNow_btn">
                <button onClick={() => addToCart(product)}>Add to Cart</button>
                <button className="buy_btn">Buy Now</button>
              </div>
            </div>
          </div>
          <div className="productDetailContainerRight">
            <Link to="/product" className="link">
              Back to Products
            </Link>
            <div className="productDetailContainerTitle">
              <h2>{product.title}</h2>
            </div>
            {hasDiscount ? (
              <div className="productDetailContainerPrice">
                <p>{formatCurrency(discountPrice)}</p>
                <div className="productDetailContainerOrgDisc">
                  <p className="orgPrice">{formatCurrency(product.price)}</p>
                  <p>{product.discount}% off</p>
                </div>
              </div>
            ) : (
              <div className="productDetailContainerOrgDisc">
                <p className="originPrice">{formatCurrency(product.price)}</p>
              </div>
            )}
            <div className="productDetailContainerSpecification">
              <div className="brand">
                {product.brand && <p>Brand</p>}
                {product.dimensions && <p>Dimensions</p>}
                {product.capacity && <p>Capacity</p>}
                {product.coolingPower && <p>Cooling Power</p>}
                {product.resolution && <p>Resolutions</p>}
                {product.display && <p>Display</p>}
                {product.specialFeature && <p>Special Feature</p>}
                {product.configuration && <p>Configuration</p>}
                {product.beeStarRating && <p>BEE Star Rating</p>}
                {product.EarPlacement && <p>Ear Placement</p>}
                {product.FormFactor && <p>Form Factor</p>}
                {product.Impedence && <p>Impedence</p>}
                {product.NoiseControl && <p>Noise Control</p>}
                {product.HeadPhoneJack && <p>Headphones Jack</p>}
                {product.batteryCapacity && <p>Battery Capacity</p>}
                {product.connectorType && <p>Connector Type</p>}
                {product.hardDiskSize && <p>Hard Disk Size</p>}
                {product.ram && <p>Ram</p>}
                {product.operatingSystem && <p>Operating System</p>}
              </div>
              <div className="capacity">
                {product.brand && <span>{product.brand}</span>}
                {product.dimensions && <span>{product.dimensions}</span>}
                {product.capacity && <span>{product.capacity} Lt.</span>}
                {product.coolingPower && (
                  <span>{product.coolingPower} Watt</span>
                )}
                {product.resolution && <span>{product.resolution}</span>}
                {product.display && <span>{product.display}</span>}
                {product.specialFeature && (
                  <span>{product.specialFeature}</span>
                )}
                {product.configuration && <span>{product.configuration}</span>}
                {product.beeStarRating && (
                  <span>{product.beeStarRating} Star</span>
                )}
                {product.EarPlacement && <span>{product.EarPlacement}</span>}
                {product.FormFactor && <span>{product.FormFactor}</span>}
                {product.Impedence && <span>{product.Impedence}</span>}
                {product.NoiseControl && <span>{product.NoiseControl}</span>}
                {product.HeadPhoneJack && <span>{product.HeadPhoneJack}</span>}
                {product.batteryCapacity && (
                  <span>{product.batteryCapacity}</span>
                )}
                {product.connectorType && <span>{product.connectorType}</span>}
                {product.hardDiskSize && <span>{product.hardDiskSize}</span>}
                {product.ram && <span>{product.ram}</span>}
                {product.operatingSystem && (
                  <span>{product.operatingSystem}</span>
                )}
              </div>
            </div>
            <div className="productDescriptions">
              <p className="heading">About this Item</p>
              <ul className="descripitionItem">
                {product.description.map((desc, index) => {
                  return (
                    <li key={index} className="descriptionList">
                      <p>{desc}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductDetail;
