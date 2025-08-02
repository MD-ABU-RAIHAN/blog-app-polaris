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

const SocialIcon = ({ blog }) => {
  return (
    <InlineStack gap="200" align="center">
      <Tooltip content="Like">
        <Button
          icon={<Icon source={ThumbsUpIcon} tone="success" />}
          variant="tertiary"
          onClick={() => {}}
        >
          <Text as="span" tone="subdued">
            {blog.likes}
          </Text>
        </Button>
      </Tooltip>

      <Tooltip content="Comment">
        <Button
          icon={<Icon source={ChatIcon} />}
          variant="tertiary"
          onClick={() => {}}
        >
          <Text as="span" tone="subdued">
            {blog.comments.length}
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
            {blog.views}
          </Text>
        </Button>
      </Tooltip>
    </InlineStack>
  );
};

export default SocialIcon;
