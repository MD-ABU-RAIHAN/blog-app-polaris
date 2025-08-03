import { Page } from "@shopify/polaris";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import useBlogsContext from "../../hooks/useBlogsContext";
import LoadingSpinner from "../LoadEmptyState/Spinner";
import EmptyBlog from "./../LoadEmptyState/EmptyBlog";

const RootLayout = () => {
  const { isShowSpinner, isShowEmptyBlog } = useBlogsContext();
  return (
    <Page>
      <Navbar />

      {!isShowEmptyBlog ? (
        isShowSpinner ? (
          <LoadingSpinner />
        ) : (
          <Outlet />
        )
      ) : (
        <EmptyBlog />
      )}
    </Page>
  );
};

export default RootLayout;
