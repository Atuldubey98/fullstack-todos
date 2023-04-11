import { ChangeEventHandler, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import useQuery from "../hooks/useQuery";

function TodoSearchForm() {
  const navigate = useNavigate();
  const query = useQuery();
  const defaultWord = query.get("word") || "";
  const [word, setWord] = useState<string>(defaultWord);
  function navigateSearchTodos(e: any) {
    e.preventDefault();
    if (word) navigate(`/todos/search?word=${word}`);
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setWord(e.currentTarget.value);
  };
  return (
    <Form onSubmit={navigateSearchTodos}>
      <Form.Group>
        <Form.Label className="fw-bold" htmlFor="word">
          Search By Title or Contents :{" "}
        </Form.Label>
        <div className="d-flex justify-content-center align-items-center gap-3 mb-3">
          <Form.Control
            type="text"
            name="word"
            id="word"
            value={word}
            onChange={onChange}
          />
          <div className="d-flex justify-content-center align-items-center">
            <Button type="submit">Search</Button>
          </div>
        </div>
      </Form.Group>
    </Form>
  );
}

export default TodoSearchForm;
