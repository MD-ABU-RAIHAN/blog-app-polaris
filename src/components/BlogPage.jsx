import {
  DescriptionList,
  BlockStack,
  InlineStack,
  Text,
  FormLayout,
  TextField,
  Button,
  Divider,
} from "@shopify/polaris";
import SocialIcon from "./SocialIcon";
import CommentCard from "./CommentCard";
import { useLoaderData } from "react-router-dom";
import { getApiData, updateApiData } from "../services/api";
import { useState } from "react";
import CommentObject from "../utils/CommentObject";

const BlogPage = () => {
  const blogData = useLoaderData();
  const [stateBlogData, setStateBlogData] = useState(blogData);

  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState({
    commenterName: "",
    comment: "",
  });

  const onChangeHandler = (field, value) => {
    setNewComment({ ...newComment, [field]: value });
  };

  const commentCancelHandler = () => {
    setError("");
    setNewComment({
      commenterName: "",
      comment: "",
    });
  };

  const commentSubmitHandler = async () => {
    if (!newComment.commenterName.trim()) {
      setError("Name is required");
      return;
    }
    if (!newComment.comment.trim()) {
      setError("Comment is required");
      return;
    }
    const commentObj = new CommentObject(newComment);
    const afterAddNewComment = [commentObj, ...stateBlogData.comments];
    await updateApiData({ comments: afterAddNewComment }, blogData.id);
    setStateBlogData({ ...stateBlogData, comments: afterAddNewComment });

    commentCancelHandler();
  };

  return (
    <>
      <BlockStack gap="200">
        <img
          alt="Blog Image"
          className="w-full rounded-t-lg"
          src={blogData.imageUrl}
        />
        <InlineStack align="end">
          {/* Social Stats Section */}
          <SocialIcon blog={stateBlogData} />
        </InlineStack>

        <Text variant="headingLg" as="h5" alignment="center">
          {blogData.title}
        </Text>
        <DescriptionList
          items={[
            {
              term: "Description",
              description: `${blogData.description}`,
            },
            {
              term: "Publish Date",
              description: `${blogData.createdAt}`,
            },
            {
              term: "Comments",
              description: (
                <span className="flex flex-col gap-1">
                  <FormLayout>
                    <TextField
                      placeholder="Enter your name"
                      value={newComment.commenterName}
                      onChange={(value) => {
                        onChangeHandler("commenterName", value);
                      }}
                      autoComplete="off"
                    />
                    <TextField
                      placeholder="Write your comment"
                      multiline={2}
                      value={newComment.comment}
                      onChange={(value) => {
                        onChangeHandler("comment", value);
                      }}
                      autoComplete="email"
                    />
                    {error && (
                      <span className="text-red-700 text-center">{error}</span>
                    )}

                    <InlineStack gap="400">
                      <Button
                        variant="primary"
                        onClick={() => {
                          commentSubmitHandler();
                        }}
                      >
                        Comment
                      </Button>
                      <Button
                        onClick={() => {
                          commentCancelHandler();
                        }}
                      >
                        Cancel
                      </Button>
                    </InlineStack>
                  </FormLayout>
                  <Divider />
                  <Divider />
                  {stateBlogData.comments.map((comment, i) => {
                    return (
                      <CommentCard
                        key={i}
                        comment={comment}
                        stateBlogData={stateBlogData}
                        setStateBlogData={setStateBlogData}
                      />
                    );
                  })}
                </span>
              ),
            },
          ]}
        />
      </BlockStack>
    </>
  );
};

export default BlogPage;

// eslint-disable-next-line react-refresh/only-export-components
export const blogPageLoader = async ({ params }) => {
  const { id } = params;
  const data = await getApiData(`${id}`);
  return data;
};
