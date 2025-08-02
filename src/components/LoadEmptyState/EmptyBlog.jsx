import { LegacyCard, EmptyState } from "@shopify/polaris";
import React from "react";

export default function EmptyBlog() {
  return (
    <LegacyCard sectioned>
      <EmptyState
        heading="Add a Blog to get started"
        action={{ content: "+ Add Blog", onAction: () => {} }}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        fullWidth
      >
        <p>
          You can use the Blog section to create posts, share updates, and
          engage your audience.
        </p>
      </EmptyState>
    </LegacyCard>
  );
}
