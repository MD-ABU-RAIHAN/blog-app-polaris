import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import BlogList from "./components/BlogList";
import BlogPage, { blogPageLoader } from "./components/BlogPage";
import { BlogsContext } from "./context/BlogsContext";
import { getApiData } from "./services/api";

import RootLayout from "./components/RootLayout";
import Page404 from "./components/LoadEmptyState/Page404";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [isShowSpinner, setIsShowSpinner] = useState(false);
  const [isShowEmptyBlog, setIsShowEmptyBlog] = useState(false);

  const getData = async () => {
    try {
      setIsShowSpinner(true);
      const data = await getApiData();
      if (data.length === 0) {
        console.log("get dATA");
        setIsShowSpinner(false);
        setIsShowEmptyBlog(true);
        return;
      }
      const dataReversed = data.toReversed();
      setBlogs([...dataReversed]);
      setIsShowSpinner(false);
    } catch (error) {
      console.log("Server Not Found >>", error);
    }
  };

  // Fast time Generate API GET Call
  useEffect(() => {
    (async () => await getData())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<BlogList />} />
        <Route path="blog/" element={<BlogList />} />
        <Route
          path="blog/:id"
          element={<BlogPage blogs={blogs} />}
          loader={blogPageLoader}
        ></Route>
        <Route path="*" element={<Page404 />} />
      </Route>
    )
  );

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        setBlogs,
        getData,
        isShowSpinner,
        isShowEmptyBlog,
      }}
    >
      <RouterProvider router={router} />
    </BlogsContext.Provider>
  );
};

export default App;
