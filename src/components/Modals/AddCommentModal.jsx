import { FormLayout, Modal, Text, TextField } from "@shopify/polaris";
import React, { useState } from "react";

const AddCommentModal = ({
  setIsCommentModalShow,
  setNewComment,
  commentFinalSubmit,
}) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleChange = () => {
    setIsCommentModalShow(false);
  };

  const submitHandler = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!comment.trim()) {
      setError("Comment is required");
      return;
    }
    setNewComment({
      commenterName: name,
      comment: comment,
    });
    await commentFinalSubmit();
    handleChange();
  };

  return (
    <Modal
      size="small"
      open={true}
      onClose={handleChange}
      title="Write Your Name and Comment "
      primaryAction={{
        content: "Comment",
        onAction: submitHandler,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <FormLayout>
          <TextField
            requiredIndicator
            label="Your name"
            value={name}
            onChange={(v) => {
              setName(v);
            }}
            autoComplete="off"
          />
          <TextField
            requiredIndicator
            multiline={4}
            label="Your comment"
            value={comment}
            onChange={(v) => {
              setComment(v);
            }}
            autoComplete="off"
          />
          {error && <span className="text-red-700 text-center">{error}</span>}
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default AddCommentModal;
