import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { StoreProvider } from "./context/storeContext.jsx";
import { CartProvider } from "./context/cartContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StoreProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </StoreProvider>
  </BrowserRouter>
);
