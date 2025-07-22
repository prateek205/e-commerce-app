import "./Breadscrum.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useStore } from "../../context/storeContext";

const Breadscrum = () => {
  const { selectCategory, selectBrand } = useStore();
  const location = useLocation();
  const { id } = useParams();

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

          <span className="pathName">
            <span className="seperator">
              <i className="fa-solid fa-angle-right"></i>
            </span>
            <span className="current">{id}</span>
          </span>
        </>
      )}

      {!isDetailPage && (
        <>
          {selectCategory.map((cat, index) => (
            <span key={index} className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">{formatName(cat)}</span>
            </span>
          ))}

          {selectBrand.map((brand, index) => (
            <span key={`brand-${index}`} className="pathName">
              <span className="seperator">
                <i className="fa-solid fa-angle-right"></i>
              </span>
              <span className="current">{formatName(brand)}</span>
            </span>
          ))}
        </>
      )}
    </div>
  );
};

export default Breadscrum;
