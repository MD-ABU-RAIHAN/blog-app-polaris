import { FormLayout, TextField, Frame, Modal } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateApiData } from "../../services/api";
import useBlogsContext from "../../hooks/useBlogsContext";

const EditBlogModal = ({ blog, setIsEditModalShow }) => {
  const [editBlog, setEditBlog] = useState({
    title: blog.title,
    imageUrl: blog.imageUrl,
    description: blog.description,
  });

  const { blogs, updateBlog } = useBlogsContext();

  const onChangeHandler = (field, value) => {
    setEditBlog({ ...editBlog, [field]: value });
  };

  const pageNavigator = useNavigate();

  const handleChange = () => {
    setIsEditModalShow(false);
  };

  const editSubmitHandler = async () => {
    const afterEditBlog = { ...blog, ...editBlog };
    const afterEditBlogs = await blogs.map((item) => {
      if (item.id === afterEditBlog.id) {
        return afterEditBlog;
      } else {
        return item;
      }
    });

    await updateApiData(afterEditBlog, afterEditBlog.id);
    await pageNavigator("/blog/" + afterEditBlog.id);

    updateBlog(afterEditBlogs);
    setIsEditModalShow(false);
  };

  return (
    <Modal
      open={true}
      onClose={handleChange}
      title="Add new blog"
      primaryAction={{
        content: "+ Add Blog",
        onAction: editSubmitHandler,
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
            label="Blog Title"
            value={editBlog.title}
            onChange={(v) => onChangeHandler("title", v)}
            autoComplete="off"
          />
          <TextField
            requiredIndicator
            value={editBlog.imageUrl}
            onChange={(v) => onChangeHandler("imageUrl", v)}
            label="Image URL"
            type="url"
            autoComplete="off"
          />
          <TextField
            requiredIndicator
            type="text"
            label="Description"
            multiline={6}
            value={editBlog.description}
            onChange={(v) => onChangeHandler("description", v)}
            autoComplete="off"
          />
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default EditBlogModal;
