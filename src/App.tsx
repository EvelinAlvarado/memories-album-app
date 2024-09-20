import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { WelcomeForm } from "./pages/WelcomeForm";
import { Gallery } from "./pages/Gallery";
import { User } from "./pages/User";
import { UserHome } from "./pages/UserHome";
import { Layout } from "./components/Layout";
import { ImageForm } from "./pages/ImageForm";
import { ImageCard } from "./pages/ImageCard";
import { Image } from "./pages/Image";
import { NewCategoryForm } from "./pages/NewCategoryForm";
import { CategoryAlbum } from "./pages/CategoryAlbum";
import { SearchResults } from "./pages/SearchResults";
function App() {
  return (
    <div className="h-screen">
      {/* <div className="h-screen flex"> */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<WelcomeForm />} />
        <Route element={<Layout />}>
          <Route path="/user-home/:userId" element={<UserHome />} />
          <Route path="/search-results" element={<SearchResults />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:categories" element={<Gallery />} />
          <Route
            path="/gallery/:categories?/:imageId"
            element={<ImageCard />}
          />
          <Route
            path="/gallery/:categories?/:imageId/image"
            element={<Image />}
          />
          <Route
            path="/album/:categoryName/:categoryId"
            element={<CategoryAlbum />}
          />
          <Route path="/image-form/:imageId?" element={<ImageForm />} />
          <Route
            path="/image-form/create-category"
            element={<NewCategoryForm />}
          />
          <Route path="/user/:userId" element={<User />} />
        </Route>
      </Routes>

      {/* </div> */}
    </div>
  );
}

export default App;
