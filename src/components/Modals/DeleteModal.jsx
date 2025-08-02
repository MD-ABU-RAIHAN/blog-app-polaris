import { Button, Modal, Frame } from "@shopify/polaris";

export function DeleteModal({ id, deleteHandler, setIsDeleteModalShow }) {
  //   const activator = <Button onClick={toggleModal}>Open</Button>;
  function closeDeleteModal() {
    setIsDeleteModalShow(false);
  }
  function confirmCloseDeleteModal() {
    deleteHandler(id);
    closeDeleteModal();
  }

  return (
    <Modal
      //   activator={activator}
      open={true}
      size="small"
      onClose={closeDeleteModal}
      title="Discard all unsaved changes"
      primaryAction={{
        destructive: true,
        content: "Delete",
        onAction: confirmCloseDeleteModal,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: closeDeleteModal,
        },
      ]}
    >
      <Modal.Section>
        Are you sure you want to delete?
        <br />
        This action cannot be undone.
      </Modal.Section>
    </Modal>
  );
}
