import {
  DescriptionList,
  BlockStack,
  InlineStack,
  Text,
  FormLayout,
  TextField,
  Button,
  Divider,
  Card,
} from "@shopify/polaris";
import SocialIcon from "../SocialIcon";
import CommentCard from "../comment/CommentCard";
import { useLoaderData } from "react-router-dom";
import { getApiData } from "../../services/api";
import CommentObject from "../../utils/CommentObject";
import { useContext } from "react";
import { BlogsContext } from "../../context/BlogsContext";
import CommentForm from "../comment/CommentForm";

const BlogPage = () => {
  const blogData = useLoaderData();

  const { blogs, updateBlog } = useContext(BlogsContext);
  const blog = blogs.find((b) => b.id === blogData.id || blogData);

  return (
    <Card>
      <BlockStack gap="200">
        <img
          alt={blogData.title}
          className="w-full rounded-t-lg"
          src={blogData.imageUrl}
        />
        <InlineStack align="end">
          {/* Social Stats Section */}
          <SocialIcon blog={blog} />
        </InlineStack>

        <Text variant="headingLg" as="h5" alignment="center">
          {blogData.title}
        </Text>
        <Card>
          <DescriptionList
            items={[
              {
                term: "Description",
                description: (
                  <div
                    dangerouslySetInnerHTML={{ __html: blogData.description }}
                  />
                ),
              },
              {
                term: "Publish Date",
                description: `${blogData.createdAt}`,
              },
              {
                term: "Comments",
                description: (
                  <span className="flex flex-col gap-1">
                    <CommentForm blog={blog} />

                    <Divider />
                    {blog.comments.map((comment, i) => {
                      return (
                        <CommentCard
                          key={i}
                          comment={comment}
                          blog={blog}
                          updateBlog={updateBlog}
                        />
                      );
                    })}
                  </span>
                ),
              },
            ]}
          />
        </Card>
      </BlockStack>
    </Card>
  );
};

export default BlogPage;

// eslint-disable-next-line react-refresh/only-export-components
export const blogPageLoader = async ({ params }) => {
  const { id } = params;
  const data = await getApiData(`${id}`);
  return data;
};
