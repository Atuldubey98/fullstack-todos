import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import useAxios from "../api/useAxios";
import TodoSearchForm from "../components/TodoSearchForm";
import TodoResult from "../components/todossearchpage/TodoResult";
import useQuery from "../hooks/useQuery";
import ISearchTodo from "../interfaces/ISearchTodo";
import { FcTodoList } from "react-icons/fc";

function TodoSearchPage() {
  const query = useQuery();
  const hasSearch = query.has("word");
  const word: string = query.get("word") || "";
  const instance = useAxios();
  const [results, setResults] = useState<ISearchTodo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  async function fetchResults() {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/v1/todos/search?word=${word}`);
      setResults(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (hasSearch) {
      fetchResults();
    }
  }, [hasSearch, word]);
  return (
    <Container>
      <Container className="mt-2">
        <TodoSearchForm />
      </Container>
      <Container>
        {loading ? (
          <Container className="d-flex align-items-center justify-content-center">
            <Spinner animation="grow" />
          </Container>
        ) : (
          results.map((result: ISearchTodo, index: number) => (
            <TodoResult result={result} key={index} />
          ))
        )}
        {results.length === 0 ? (
          <h1 className="text-center">
            <FcTodoList />
            No Todos found{" "}
          </h1>
        ) : null}
      </Container>
    </Container>
  );
}

export default TodoSearchPage;
