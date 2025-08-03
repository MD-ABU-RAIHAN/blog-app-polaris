import {
  Box,
  Divider,
  InlineGrid,
  InlineStack,
  Layout,
  Text,
} from "@shopify/polaris";
import useBlogsContext from "../../hooks/useBlogsContext";
import BlogCard from "./BlogCard";

const BlogList = () => {
  const { blogs } = useBlogsContext();

  return (
    <Layout>
      {/* Header Section */}
      <Layout.Section>
        <Box paddingInline="500" paddingBlockStart="500">
          <InlineStack align="space-between" blockAlign="center">
            <Text variant="headingLg" as="h2">
              All Blogs
            </Text>
            <Text as="span">{blogs.length} posts</Text>
          </InlineStack>
        </Box>
        <Divider />
      </Layout.Section>

      {/* Blog Cards Grid */}
      <Layout.Section>
        <Box>
          <InlineGrid gap="400" alignItems="center">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </InlineGrid>
        </Box>
      </Layout.Section>
    </Layout>
  );
};

export default BlogList;
