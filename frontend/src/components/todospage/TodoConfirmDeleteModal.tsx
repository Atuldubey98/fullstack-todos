import { useContext, useState } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import useAxios from "../../api/useAxios";
import { TodoContext } from "../../contexts/TodoContext";

function TodoConfirmDeleteModal({
  show,
  handleClose,
  _id,
}: {
  show: boolean;
  handleClose: () => void;
  _id: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const { deleteTodoContext } = useContext(TodoContext);
  const instance = useAxios();
  async function onClick() {
    try {
      setLoading(true);
      const response = await instance.delete(`/api/v1/todos/${_id}`);
      if (response.status === 204) {
        handleClose();
        deleteTodoContext(_id);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete the todo ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {loading ? (
          <Spinner animation="grow" />
        ) : (
          <Button variant="danger" onClick={onClick}>
            Delete
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default TodoConfirmDeleteModal;
