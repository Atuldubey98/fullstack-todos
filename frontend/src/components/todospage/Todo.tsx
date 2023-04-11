import { useContext, useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import ITodo from "../../interfaces/ITodo";
import TodoConfirmDeleteModal from "./TodoConfirmDeleteModal";
import styles from "./Todo.module.css";
import useDate from "../../hooks/useDate";
import useAxios from "../../api/useAxios";
import { TodoContext } from "../../contexts/TodoContext";
import { UIContext } from "../../contexts/UIContext";
function Todo({
  todo,
  onSetTodo,
}: {
  todo: ITodo;
  onSetTodo: (t: ITodo) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const { updateTodoContext } = useContext(TodoContext);

  const [completeLoading, setCompleteLoading] = useState<boolean>(false);
  const { getDate } = useDate();
  const instance = useAxios();
  function onClick() {
    onSetTodo(todo);
  }
  function handleClose() {
    setShow(!show);
  }
  async function onChange() {
    try {
      const url = `api/v1/todos/${todo?._id}`;
      setCompleteLoading(true);
      const { data } = await instance.put(url, { complete: !todo.complete });
      updateTodoContext(data);
    } catch (error) {
      console.log(error);
    } finally {
      setCompleteLoading(false);
    }
  }
  const { isThemeDark } = useContext(UIContext);
  return (
    <Card
      style={{
        backgroundColor: isThemeDark ? "rgba(59,50,89,0.35)" : undefined,
        border: todo.complete ? "3px solid #00ef0087" : "",
      }}
      className="m-1"
    >
      <AiTwotoneDelete
        style={{ cursor: "pointer" }}
        size={"20px"}
        color="red"
        onClick={handleClose}
      />
      <Card.Body
        className={styles.card__todoBody}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <Card.Title>{todo.title}</Card.Title>
        <Card.Text>{todo.content}</Card.Text>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-between text-muted">
        {getDate(todo)}
        {completeLoading ? (
          <Spinner animation="grow" />
        ) : (
          <Form.Check
            type="checkbox"
            name="complete"
            id="complete"
            onChange={onChange}
            checked={todo.complete}
          />
        )}
      </Card.Footer>
      <TodoConfirmDeleteModal
        show={show}
        handleClose={handleClose}
        _id={todo._id}
      />
    </Card>
  );
}

export default Todo;
