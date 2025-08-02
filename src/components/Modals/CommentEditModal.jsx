import { FormLayout, Modal, TextField } from "@shopify/polaris";
import React, { useState } from "react";

const CommentEditModal = ({
  comment,
  commentEditHandler,
  setIsCommentEditModalShow,
}) => {
  const [error, setError] = useState("");
  const [name, setName] = useState(comment.commenterName);
  const [comm, setComm] = useState(comment.comment);

  const handleChange = () => {
    setIsCommentEditModalShow(false);
  };

  const submitHandler = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }
    if (!comm.trim()) {
      setError("Comment is required");
      return;
    }

    commentEditHandler({
      ...comment,
      commenterName: name,
      comment: comm,
    });
    handleChange();
  };

  return (
    <Modal
      size="small"
      open={true}
      onClose={handleChange}
      title="Write Your Name and Comment "
      primaryAction={{
        content: "Save Change",
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
            value={comm}
            onChange={(v) => {
              setComm(v);
            }}
            autoComplete="off"
          />
          {error && <span className="text-red-700 text-center">{error}</span>}
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default CommentEditModal;
