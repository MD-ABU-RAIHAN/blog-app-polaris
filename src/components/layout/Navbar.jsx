import { Box, Text, Button, ButtonGroup, InlineStack } from "@shopify/polaris";
import { useNavigate } from "react-router-dom";
import AddNewBlogModal from "../Modals/AddNewBlogModal";
import { useState } from "react";
import WysiwygEditor from "../WysiwygEditor/WysiwygEditor";

const Navbar = () => {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const pageNavigator = useNavigate();

  const addBtnOnClickHandler = () => {
    setIsShowAddModal(true);
  };

  return (
    <>
      <Box background="bg-surface-secondary" padding="400" borderRadius="300">
        <InlineStack align="space-between" blockAlign="center">
          <Text variant="headingXl" as="h1">
            Blog App
          </Text>

          <ButtonGroup>
            <Button
              size="large"
              variant="primary"
              onClick={() => pageNavigator("/")}
            >
              All Blog
            </Button>
            <Button
              size="large"
              variant="primary"
              onClick={addBtnOnClickHandler}
            >
              + Add Blog
            </Button>
          </ButtonGroup>
        </InlineStack>
      </Box>

      {isShowAddModal && (
        <AddNewBlogModal
          isShowAddModal={isShowAddModal}
          setIsShowAddModal={setIsShowAddModal}
        />
      )}
    </>
  );
};

export default Navbar;
