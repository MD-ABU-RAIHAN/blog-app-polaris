import React, { useContext } from "react";
import { BlogsContext } from "../context/BlogsContext";

const useBlogsContext = () => {
  const blogsContext = useContext(BlogsContext);
  return blogsContext;
};

export default useBlogsContext;
