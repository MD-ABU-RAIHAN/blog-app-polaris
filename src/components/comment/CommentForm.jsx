import React, { useContext, useState } from "react";
import CommentObject from "../../utils/CommentObject";
import { updateApiData } from "../../services/api";
import { BlogsContext } from "../../context/BlogsContext";
import {
  Button,
  Divider,
  FormLayout,
  InlineStack,
  TextField,
} from "@shopify/polaris";

const CommentForm = ({ blog }) => {
  const [error, setError] = useState("");
  const [newComment, setNewComment] = useState({
    commenterName: "",
    comment: "",
  });

  const { updateBlog } = useContext(BlogsContext);

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
    const afterAddNewComment = [commentObj, ...blog.comments];
    await updateApiData({ comments: afterAddNewComment }, blog.id);
    updateBlog({ ...blog, comments: afterAddNewComment });

    commentCancelHandler();
  };
  return (
    <>
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
        {error && <span className="text-red-700 text-center">{error}</span>}

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
    </>
  );
};

export default CommentForm;
