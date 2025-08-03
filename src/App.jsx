import { useCallback, useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

import BlogPage, { blogPageLoader } from "./components/blog/BlogPage";
import { BlogsContext } from "./context/BlogsContext";
import { getApiData } from "./services/api";

import Page404 from "./components/LoadEmptyState/Page404";
import BlogList from "./components/blog/BlogList";
import RootLayout from "./components/layout/RootLayout";

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [isShowSpinner, setIsShowSpinner] = useState(false);
  const [isShowEmptyBlog, setIsShowEmptyBlog] = useState(false);

  const getData = useCallback(async () => {
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
  }, []);

  // Fast time Generate API GET Call
  useEffect(() => {
    getData();
  }, [getData]);

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

  // eslint-disable-next-line no-unused-vars
  const updateBlog = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updateBlog.id ? updateBlog : blog))
    );
    getData();
  };

  return (
    <BlogsContext.Provider
      value={{
        blogs,
        setBlogs,
        updateBlog,
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
