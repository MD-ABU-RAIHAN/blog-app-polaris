import { MediaCard, Box, Text } from "@shopify/polaris";
import { DeleteIcon, EditIcon } from "@shopify/polaris-icons";

import SocialIcon from "./SocialIcon";
import truncateText from "../utils/truncateText";
import { Navigate, useNavigate } from "react-router-dom";

import useBlogsContext from "../hooks/useBlogsContext";
import { deleteApiData } from "../services/api";
import { DeleteModal } from "./Modals/DeleteModal";
import { useState } from "react";
import EditBlogModal from "./Modals/EditBlogModal";

const BlogCard = ({ blog }) => {
  const [isDeleteModalShow, setIsDeleteModalShow] = useState(false);
  const [isEditModalShow, setIsEditModalShow] = useState(false);

  const pageNavigator = useNavigate();

  const { blogs, setBlogs } = useBlogsContext();

  const openFullPage = (id) => {
    pageNavigator(`/blog/${id}`);
  };

  const deleteHandler = async (id) => {
    await deleteApiData(id);
    setBlogs(blogs.filter((blog) => blog.id !== id));
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
            title={truncateText(blog.title, 50)}
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
              <img src={blog.imageUrl} className="w-full h-64 object-cover" />
            </Box>
          </MediaCard>
          {/* Social icons overlay */}
          <div className="absolute bottom-3 right-3 flex ">
            <SocialIcon blog={blog} />
          </div>
        </Box>
      }
    </>
  );
};

export default BlogCard;
