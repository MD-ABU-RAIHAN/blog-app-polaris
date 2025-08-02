import React from "react";
import { EmptyState, LegacyCard } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const pageNavigator = useNavigate();
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="404 - Page Not Found"
        action={{
          content: "Go back to homepage",
          onAction: () => pageNavigator("/"),
        }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
      >
        <p>
          Oops! The page you're looking for doesn't exist.
          <br />
          <br />
          It may have been moved, deleted, or you might have mistyped the URL.
          Please check the address and try again.
        </p>
      </EmptyState>
    </LegacyCard>
  );
};

export default Page404;
