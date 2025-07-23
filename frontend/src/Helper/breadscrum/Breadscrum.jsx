import "./Breadscrum.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useStore } from "../../context/storeContext";

const Breadscrum = () => {
  const { selectCategory, selectBrand, filterProduct } = useStore();
  const location = useLocation();
  const { category, brand, id } = useParams();

  const formatName = (segment) =>
    segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const pathnames = location.pathname.split("/").filter(Boolean);
  const isDetailPage = id && pathnames.length === 3;


  return (
    <div className="breadscrum">
      <span className="value">
        <Link to="/">Home</Link>
      </span>

      <span className="pathName">
        <span className="seperator">
          <i className="fa-solid fa-angle-right"></i>
        </span>
        <span className="current">
          <Link to="/product">Product</Link>
        </span>
      </span>

      {isDetailPage && (
        <>
          <span className="pathName">
            <span className="seperator">
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="current">
              <Link to={`/product/${pathnames[1]}`}>
                {formatName(pathnames[1])}
              </Link>
            </span>
          </span>
        </>
      )}

      {!isDetailPage && (
        <>
          {category && (
            <span className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">
                <Link to={`/product?category=${category}`}>
                  {formatName(category)}
                </Link>
              </span>
            </span>
          )}

          {brand && (
            <span className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">
                <Link to={`/product?category=${category}&brand=${brand}`}>
                  {formatName(brand)}
                </Link>
              </span>
            </span>
          )}

          {id && (
            <span className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">{id}</span>
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Breadscrum;
