import { useState } from "react";
import { Card } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import ITodo from "../../interfaces/ITodo";
import TodoConfirmDeleteModal from "./TodoConfirmDeleteModal";
import styles from "./Todo.module.css";
import useDate from "../../hooks/useDate";
function Todo({
  todo,
  onSetTodo,
}: {
  todo: ITodo;
  onSetTodo: (t: ITodo) => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const { getDate } = useDate();
  function onClick() {
    onSetTodo(todo);
  }
  function handleClose() {
    setShow(!show);
  }
  return (
    <Card className={styles.card__todo}>
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
      <Card.Footer className="text-muted">{getDate(todo)}</Card.Footer>
      <TodoConfirmDeleteModal
        show={show}
        handleClose={handleClose}
        _id={todo._id}
      />
    </Card>
  );
}

export default Todo;
