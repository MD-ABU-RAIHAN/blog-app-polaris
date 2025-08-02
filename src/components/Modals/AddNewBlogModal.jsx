import { FormLayout, TextField, Frame, Modal } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import BlogObject from "../../utils/BlogObject";
import { useState } from "react";
import { postApiData } from "../../services/api";
import useBlogsContext from "../../hooks/useBlogsContext";

const AddNewBlogModal = ({ isShowAddModal, setIsShowAddModal }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    imageUrl: "",
    description: "",
  });
  const [error, setError] = useState("");

  const { blogs, setBlogs } = useBlogsContext();

  const onChangeHandler = (field, value) => {
    setNewBlog({ ...newBlog, [field]: value });
  };

  const pageNavigator = useNavigate();

  const handleChange = () => {
    setIsShowAddModal(!isShowAddModal);
  };

  const submitHandler = async () => {
    if (!newBlog.title.trim()) {
      setError("Title is required!");
      return;
    }
    if (!newBlog.imageUrl.trim()) {
      setError("Image URL is required!");
      return;
    }
    if (!newBlog.description.trim()) {
      setError("Description required!");
      return;
    }

    const newBlogObject = new BlogObject(newBlog);
    await postApiData(newBlogObject);
    await pageNavigator("/blog/" + newBlogObject.id);

    setBlogs([newBlogObject, ...blogs]);

    setIsShowAddModal(!isShowAddModal);
    setNewBlog({
      title: "",
      imageUrl: "",
      description: "",
    });
  };

  return (
    <Modal
      open={true}
      onClose={handleChange}
      title="Add new blog"
      primaryAction={{
        content: "+ Add Blog",
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
            label="Blog Title"
            value={newBlog.title}
            onChange={(v) => onChangeHandler("title", v)}
            autoComplete="off"
          />
          <TextField
            requiredIndicator
            value={newBlog.imageUrl}
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
            value={newBlog.description}
            onChange={(v) => onChangeHandler("description", v)}
            autoComplete="off"
          />
          {error && <span className="text-red-700 text-center">{error}</span>}
        </FormLayout>
      </Modal.Section>
    </Modal>
  );
};

export default AddNewBlogModal;
