import {
  Button,
  InlineStack,
  Text,
  Icon,
  Tooltip,
  BlockStack,
} from "@shopify/polaris";
import {
  ThumbsUpIcon,
  ChatIcon,
  EyeCheckMarkIcon,
} from "@shopify/polaris-icons";
import { useState } from "react";
import { updateApiData } from "../services/api";
import { useNavigate } from "react-router-dom";

const SocialIcon = ({ blog }) => {
  const [stateBlog, setStateBlog] = useState(blog);

  const pageNavigator = useNavigate();

  const likeHandler = async () => {
    const updatedObject = { ...stateBlog, likes: stateBlog.likes + 1 };
    setStateBlog(updatedObject);
    await updateApiData({ likes: stateBlog.likes + 1 }, updatedObject.id);
  };

  return (
    <InlineStack gap="200" align="center">
      <Tooltip content="Like">
        <Button
          icon={<Icon source={ThumbsUpIcon} tone="success" />}
          variant="tertiary"
          onClick={() => {
            likeHandler();
          }}
        >
          <Text as="span" tone="subdued">
            {stateBlog.likes}
          </Text>
        </Button>
      </Tooltip>

      <Tooltip content="Comment">
        <Button
          icon={<Icon source={ChatIcon} />}
          variant="tertiary"
          onClick={() => {
            pageNavigator(`/blog/${blog.id}`);
          }}
        >
          <Text as="span" tone="subdued">
            {stateBlog.comments.length}
          </Text>
        </Button>
      </Tooltip>

      <Tooltip content="Views">
        <Button
          icon={<Icon source={EyeCheckMarkIcon} />}
          variant="tertiary"
          onClick={() => {}}
        >
          <Text as="span" tone="subdued">
            {stateBlog.views}
          </Text>
        </Button>
      </Tooltip>
    </InlineStack>
  );
};

export default SocialIcon;
