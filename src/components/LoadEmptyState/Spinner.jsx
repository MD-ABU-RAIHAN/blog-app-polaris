import { BlockStack, Box, InlineStack, Spinner } from "@shopify/polaris";
import React from "react";

export default function LoadingSpinner() {
  return (
    <InlineStack align="center">
      <div className="mt-10">
        <Spinner accessibilityLabel="Loading" size="large" />
      </div>
    </InlineStack>
  );
}
