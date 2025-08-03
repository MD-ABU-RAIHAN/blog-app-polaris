import Editor from "react-simple-wysiwyg";

const WysiwygEditor = ({ newBlog, onChangeHandler }) => {
  return (
    <Editor
      value={newBlog.description}
      onChange={(e) => onChangeHandler("description", e.target.value)}
    />
  );
};

export default WysiwygEditor;
