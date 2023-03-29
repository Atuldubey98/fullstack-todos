import { useContext, useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import AddUpdateTodoModal from "../components/todospage/AddUpdateTodoModal";
import Options from "../components/todospage/Options";
import Todo from "../components/todospage/Todo";
import { TodoContext } from "../contexts/TodoContext";
import ITodo from "../interfaces/ITodo";

const TodosPage = () => {
  const { state, getTodos } = useContext(TodoContext);
  const { loading, todos, error } = state;
  const [todo, setTodo] = useState<ITodo>();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showAdd, setshowAdd] = useState<boolean>(false);
  function onSetTodo(todo: ITodo) {
    setTodo(todo);
    setShowUpdate(true);
  }
  function toggleShowUpdate() {
    setShowUpdate(!showUpdate);
  }
  function toggleShowAdd() {
    setshowAdd(!showAdd);
  }
  useEffect(() => {
    getTodos();
  }, []);
  return (
    <Container fluid>
      <Options toggleShowAdd={toggleShowAdd} />
      <Container className="mt-2 d-flex justify-content-center align-items-center">
        {error ? <Alert variant={"danger"}>{error}</Alert> : null}
        {loading ? <Spinner animation="grow" /> : null}
      </Container>
      <Row xs={1} md={2} xl={3}>
        {todos.map((todo) => (
          <Col key={todo._id}>
            <Todo todo={todo} onSetTodo={onSetTodo} />
          </Col>
        ))}
      </Row>

      {showUpdate ? (
        <AddUpdateTodoModal
          show={showUpdate}
          onHide={toggleShowUpdate}
          todo={todo}
        />
      ) : null}
      <AddUpdateTodoModal show={showAdd} onHide={toggleShowAdd} />
    </Container>
  );
};

export default TodosPage;
