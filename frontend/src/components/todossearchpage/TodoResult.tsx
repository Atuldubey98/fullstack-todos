import { useContext, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import ISearchTodo from "../../interfaces/ISearchTodo";
import { UIContext } from "../../contexts/UIContext";
import styles from './TodoResult.module.css';
function TodoResult({ result }: { result: ISearchTodo }) {
  const [openTodos, setTodos] = useState<boolean>(false);
  function toggleTodos() {
    setTodos(!openTodos);
  }
  const { isThemeDark } = useContext(UIContext);

  return (
    <div className="mb-2">
      <Card className={`${isThemeDark ? "bg-secondary" : ``}`}>
        <Card.Header>
          {openTodos ? (
            <AiFillCaretUp onClick={toggleTodos} />
          ) : (
            <AiFillCaretDown onClick={toggleTodos} />
          )}
          {result.createdAt}
        </Card.Header>
      </Card>
      {openTodos ? (
        <div className={styles.todo__results}>
          {result.todos.map((todo, index) => (
            <ListGroup className="mb-1" key={index} as="ul">
              <ListGroup.Item as="li" active>
                {todo.title}
              </ListGroup.Item>
              <ListGroup.Item as="li">{todo.content}</ListGroup.Item>
            </ListGroup>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default TodoResult;
