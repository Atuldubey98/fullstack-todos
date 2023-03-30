import { useCallback, useContext, useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import AddUpdateTodoModal from "../components/todospage/AddUpdateTodoModal";
import Options from "../components/todospage/Options";
import Todo from "../components/todospage/Todo";
import { FcTodoList } from "react-icons/fc";

import { TodoContext } from "../contexts/TodoContext";
import ITodo from "../interfaces/ITodo";
import useDate from "../utils/useDate";

const TodosPage = () => {
  const { state, getTodos } = useContext(TodoContext);
  const { loading, todos, error } = state;
  const [todo, setTodo] = useState<ITodo>();
  const [showUpdate, setShowUpdate] = useState<boolean>(false);
  const [showAdd, setshowAdd] = useState<boolean>(false);
  const { getPreviousOrNextDate } = useDate();
  const [filter, setFilter] = useState({
    createdAt: {
      gte: new Date().toISOString().substring(0, 10),
      lte: getPreviousOrNextDate(new Date(Date.now()), 1),
    },
  });
  function onSetTodo(todo: ITodo) {
    setTodo(todo);
    setShowUpdate(true);
  }
  const callbackChangeFilter = useCallback(onChangeFilter, [filter]);
  const callbackToggleShowAdd = useCallback(toggleShowAdd, [showAdd]);
  function onChangeFilter(params: any, name: string) {
    setFilter({ ...filter, [name]: params });
  }
  function toggleShowUpdate() {
    setShowUpdate(!showUpdate);
  }
  function toggleShowAdd() {
    setshowAdd(!showAdd);
  }
  useEffect(() => {
    getTodos(filter);
  }, [filter]);

  return (
    <Container fluid>
      <Options
        toggleShowAdd={callbackToggleShowAdd}
        onChangeFilter={callbackChangeFilter}
      />
      <Container className="mt-2 d-flex justify-content-center align-items-center">
        {error ? <Alert variant={"danger"}>{error}</Alert> : null}
        {loading ? <Spinner animation="grow" /> : null}
        {todos.length <= 0 ? (
          <h1 style={{ fontSize: "3rem" }} className="font-weight-bold">
            <FcTodoList />
            Nothing to do !
          </h1>
        ) : null}
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
