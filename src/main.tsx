import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { CategoryProvider } from "./context/CategoryContext.tsx";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageCardProvider } from "./context/ImageCardContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ImageCardProvider>
        <CategoryProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </CategoryProvider>
      </ImageCardProvider>
    </BrowserRouter>
  </React.StrictMode>
);

/**
 * !Important Note on Using useContext and react-router
To ensure useContext works correctly in a React application that uses react-router, it is essential to follow these guidelines:

The Provider must wrap the components that use the context:

When using useContext, ensure that the component utilizing it is wrapped by the corresponding Provider. Otherwise, useContext will not be able to access the context value.
Integration with react-router:

If you are using react-router, the Provider that needs access to router data (such as useLocation) must be inside the Router. This ensures that the router context is available to the Provider.
 */
