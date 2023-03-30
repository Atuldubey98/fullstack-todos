import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useAxios from "../api/useAxios";
import TodoSearchForm from "../components/TodoSearchForm";
import useQuery from "../hooks/useQuery";
import ISearchTodo from "../interfaces/ISearchTodo";

function TodoSearchPage() {
  const query = useQuery();
  const hasSearch = query.has("word");
  const intance = useAxios();
  const [results, setResults] = useState<ISearchTodo[]>([]);
  useEffect(() => {
    if (hasSearch) {
      (async () => {
        const { data } = await intance.get("/api/v1/todos/search", {
          params: { word: query.get("word") },
        });
        setResults(data);
      })();
    }
  }, [hasSearch]);
  return (
    <Container>
      <Container className="mt-2">
        <TodoSearchForm />
      </Container>
      <Container>
        
      </Container>
    </Container>
  );
}

export default TodoSearchPage;
