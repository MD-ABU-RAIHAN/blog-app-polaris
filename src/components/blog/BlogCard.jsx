import { MediaCard, Box, Text, Link, Button } from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";

import SocialIcon from "../SocialIcon";
import truncateText from "../../utils/truncateText";
import { Navigate, useNavigate } from "react-router-dom";

import useBlogsContext from "../../hooks/useBlogsContext";
import { deleteApiData, updateApiData } from "../../services/api";
import { DeleteModal } from "../Modals/DeleteModal";
import { useCallback, useState } from "react";
import EditBlogModal from "../Modals/EditBlogModal";

const BlogCard = ({ blog }) => {
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isEditModalShow, setIsEditModalShow] = useState(false);

  const pageNavigator = useNavigate();

  const { blogs, updateBlog } = useBlogsContext();

  const openFullPage = (id) => {
    pageNavigator(`/blog/${id}`);
    totalViewUpdate();
  };

  const totalViewUpdate = useCallback(async () => {
    const updatedObj = { ...blog, views: blog.views + 1 };
    await updateApiData({ views: blog.views + 1 }, blog.id);
    updateBlog(updatedObj);
  }, [blog.id, blog.views, updateBlog]);

  const deleteHandler = async (id) => {
    await deleteApiData(id);
    updateBlog(blogs.filter((blog) => blog.id !== id));
  };

  const deleteModalOpener = () => {
    setIsDeleteModalShow(!isDeleteModalShow);
  };
  const editModalOpener = () => {
    setIsEditModalShow(!isEditModalShow);
  };

  return (
    <>
      {isDeleteModalShow && (
        <DeleteModal
          setIsDeleteModalShow={setIsDeleteModalShow}
          id={blog.id}
          deleteHandler={deleteHandler}
        />
      )}

      {isEditModalShow && (
        <EditBlogModal blog={blog} setIsEditModalShow={setIsEditModalShow} />
      )}

      {
        <Box position="relative">
          <MediaCard
            title={
              <Button variant="plain" onClick={() => openFullPage(blog.id)}>
                <Text variant="headingMd" as="h6">
                  {truncateText(blog.title, 50)}
                </Text>
              </Button>
            }
            description={truncateText(blog.description, 250)}
            secondaryAction={{
              content: "Learn more",
              onAction: () => {
                openFullPage(blog.id);
              },
            }}
            popoverActions={[
              {
                content: "Edit",
                icon: EditIcon,
                onAction: () => {
                  editModalOpener();
                },
              },
              {
                content: "Delete ",
                destructive: true,
                icon: DeleteIcon,
                onAction: () => {
                  deleteModalOpener();
                },
              },
            ]}
          >
            <Box>
              <img
                onClick={() => openFullPage(blog.id)}
                alt={blog.title}
                src={blog.imageUrl}
                className="w-full h-64 object-cover cursor-pointer hover:opacity-80 duration-300"
              />
            </Box>
          </MediaCard>
          {/* Social icons overlay */}
          <div className="absolute bottom-3 right-3 fl`ex ">
            <SocialIcon blog={blog} />
          </div>
        </Box>
      }
    </>
  );
};

export default BlogCard;
