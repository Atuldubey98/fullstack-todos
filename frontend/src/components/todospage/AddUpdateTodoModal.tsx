import {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import apiError from "../../api/apiErrors";
import useAxios from "../../api/useAxios";
import { TodoContext } from "../../contexts/TodoContext";
import ITodo from "../../interfaces/ITodo";
function AddUpdateTodoModal({
  todo,
  show,
  onHide,
}: {
  todo?: ITodo;
  show: boolean;
  onHide: () => void;
}) {
  const { updateTodoContext, addTodoContext } = useContext(TodoContext);
  const [error, setError] = useState<string>("");
  const [inital, setInitial] = useState<any>(
    todo || { content: "", title: "" }
  );
  const contentRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const reference = contentRef.current;
    if (reference) {
      reference.style.height = `${contentRef.current.scrollHeight}px`;
    }
  }, []);
  const instance = useAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (
    e
  ) => {
    const { value, name } = e.currentTarget;
    setInitial({ ...inital, [name]: value });
  };

  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    try {
      if (inital?._id) {
        await update();
      } else {
        await addTodo();
      }
      onHide();
    } catch (e) {
      setError(apiError(e));
    } finally {
      setLoading(false);
    }
  }
  async function update() {
    const url = `api/v1/todos/${inital?._id}`;
    try {
      const { data } = await instance.put(url, inital);
      updateTodoContext(data);
    } catch (error) {
      throw error;
    }
  }
  async function addTodo() {
    const url: string = "/api/v1/todos";
    try {
      const { data } = await instance.post(url, inital);
      addTodoContext(data);
    } catch (error) {
      throw error;
    }
  }
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Todo</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="form-title">
            <Form.Label>Title : </Form.Label>
            <Form.Control
              type="text"
              required
              name="title"
              onChange={onChange}
              value={inital?.title}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="form-content">
            <Form.Label>Content : </Form.Label>
            <Form.Control
              type="text"
              required
              ref={contentRef}
              style={{}}
              as={"textarea"}
              name="content"
              onChange={onChange}
              value={inital?.content}
            />
          </Form.Group>
          {error ? <Alert variant={"danger"}>{error}</Alert> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onHide} variant="secondary">
            Close
          </Button>
          {loading ? (
            <Spinner animation="grow" />
          ) : (
            <Button variant={inital?._id ? "warning" : "success"} type="submit">
              {inital?._id ? <span>Update</span> : "Save"}
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
export default AddUpdateTodoModal;
