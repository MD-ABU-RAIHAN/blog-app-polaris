import { Page } from "@shopify/polaris";
import Navbar from "./Navbar";
import useBlogsContext from "../hooks/useBlogsContext";
import { Outlet } from "react-router-dom";
import SpinnerExample from "./LoadEmptyState/Spinner";

const RootLayout = () => {
  const { isShowSpinner, isShowEmptyBlog } = useBlogsContext();
  return (
    <Page>
      <Navbar />

      {!isShowEmptyBlog ? (
        isShowSpinner ? (
          <SpinnerExample />
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
