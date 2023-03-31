import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import ISearchTodo from "../../interfaces/ISearchTodo";

function TodoResult({ result }: { result: ISearchTodo }) {
  const [openTodos, setTodos] = useState<boolean>(false);
  function toggleTodos() {
    setTodos(!openTodos);
  }
  return (
    <div className="mb-2">
      <Card>
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
        <div>
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
