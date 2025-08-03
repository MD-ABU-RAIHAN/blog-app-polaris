import { Button, Modal, Frame } from "@shopify/polaris";

export function DeleteModal({
  id,
  deleteHandler,
  setIsDeleteModalShow,
  title = "Confirm Deletion",
  content = "Are you sure you want to delete? This action cannot be undone.",
}) {
  //   const activator = <Button onClick={toggleModal}>Open</Button>;
  function onClose() {
    setIsDeleteModalShow(false);
  }
  function confirmDeleteHandler() {
    try {
      deleteHandler(id);
    } catch (error) {
      console.log("Delete Failed:", error);
    } finally {
      onClose();
    }
  }

  return (
    <Modal
      //   activator={activator}
      open={true}
      size="small"
      onClose={onClose}
      title={title}
      primaryAction={{
        destructive: true,
        content: "Delete",
        onAction: confirmDeleteHandler,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>{content}</Modal.Section>
    </Modal>
  );
}
