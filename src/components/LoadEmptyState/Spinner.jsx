import { BlockStack, Box, InlineStack, Spinner } from "@shopify/polaris";
import React from "react";

export default function SpinnerExample() {
  return (
    <InlineStack align="center">
      <div className="mt-10">
        <Spinner accessibilityLabel="Spinner example" size="large" />
      </div>
    </InlineStack>
  );
}
