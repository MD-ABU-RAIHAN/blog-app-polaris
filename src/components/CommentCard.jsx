import {
  Card,
  BlockStack,
  Text,
  InlineGrid,
  ButtonGroup,
  Button,
} from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import { DeleteModal } from "./Modals/DeleteModal";
import { updateApiData } from "../services/api";
import CommentEditModal from "./Modals/CommentEditModal";

const CommentCard = ({ comment, stateBlogData, setStateBlogData }) => {
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isCommentEditModalShow, setIsCommentEditModalShow] = useState(false);

  const deleteModalOpener = () => {
    setIsDeleteModalShow(true);
  };
  const commentEditModalOpener = () => {
    setIsCommentEditModalShow(true);
  };

  const commentEditHandler = async (data) => {
    await updateApiData(
      {
        comments: stateBlogData.comments.map((comment) => {
          if (comment.id === data.id) {
            return data;
          }
          return comment;
        }),
      },
      stateBlogData.id
    );

    setStateBlogData({
      ...stateBlogData,
      comments: stateBlogData.comments.map((comment) => {
        if (comment.id === data.id) {
          return data;
        }
        return comment;
      }),
    });
  };

  const deleteHandler = async (id) => {
    await updateApiData(
      {
        comments: stateBlogData.comments.filter((comment) => comment.id !== id),
      },
      stateBlogData.id
    );
    setStateBlogData({
      ...stateBlogData,
      comments: stateBlogData.comments.filter((comment) => comment.id !== id),
    });
  };

  return (
    <>
      {isCommentEditModalShow && (
        <CommentEditModal
          comment={comment}
          commentEditHandler={commentEditHandler}
          setIsCommentEditModalShow={setIsCommentEditModalShow}
        />
      )}
      {isDeleteModalShow && (
        <DeleteModal
          id={comment.id}
          deleteHandler={deleteHandler}
          setIsDeleteModalShow={setIsDeleteModalShow}
        />
      )}
      <Card roundedAbove="sm">
        <BlockStack gap="400">
          <BlockStack gap="200">
            <InlineGrid columns="1fr auto">
              <BlockStack gap="200">
                <Text as="h2" variant="headingSm">
                  Commenter name: {comment.commenterName}
                </Text>
              </BlockStack>
              <ButtonGroup>
                <Button
                  icon={DeleteIcon}
                  variant="tertiary"
                  tone="critical"
                  onClick={() => {
                    deleteModalOpener();
                  }}
                  accessibilityLabel="Delete"
                />
                <Button
                  icon={EditIcon}
                  variant="tertiary"
                  onClick={() => {
                    commentEditModalOpener();
                  }}
                  accessibilityLabel="Edit"
                />
              </ButtonGroup>
            </InlineGrid>
            <Text as="p" variant="bodyMd">
              {comment.comment}
              <br />
              {comment.createdAt}
            </Text>
          </BlockStack>
        </BlockStack>
      </Card>
    </>
  );
};

export default CommentCard;
