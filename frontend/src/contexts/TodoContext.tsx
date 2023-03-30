import { AxiosError } from "axios";
import { createContext, useReducer } from "react";
import apiError from "../api/apiErrors";
import useAxios from "../api/useAxios";
import IDefaultTodoState from "../interfaces/IDefaultTodoState";
import ITodo from "../interfaces/ITodo";
import todoReducer, {
  TODOS_ERROR,
  TODOS_LOADING,
  TODOS_SUCCESS,
  TODO_ADD,
  TODO_DELETE,
  TODO_UPDATE,
} from "../reducers/todoReducer";

const defaultTodosState: IDefaultTodoState = {
  todos: [],
  loading: false,
  error: "",
};
export const TodoContext = createContext({
  state: defaultTodosState,
  getTodos: function (filter: any) {},
  updateTodoContext: function (todo: ITodo) {},
  addTodoContext: function (todo: ITodo) {},
  deleteTodoContext: function (_id: string) {},
});
export default function TodoContextProvider({ children }: any) {
  const instance = useAxios();
  const [state, dispatch] = useReducer(todoReducer, defaultTodosState);

  async function getTodos(filter: any) {
    try {
      dispatch({ type: TODOS_LOADING });
      const { data } = await instance.get("/api/v1/todos", { params: filter });
      dispatch({ type: TODOS_SUCCESS, payload: data.data });
    } catch (error) {
      dispatch({
        type: TODOS_ERROR,
        payload: apiError(error),
      });
    }
  }
  function addTodoContext(todo: ITodo) {
    dispatch({ type: TODO_ADD, payload: todo });
  }
  function updateTodoContext(todo: ITodo) {
    dispatch({ type: TODO_UPDATE, payload: todo });
  }
  function deleteTodoContext(_id: string) {
    dispatch({ type: TODO_DELETE, payload: _id });
  }
  return (
    <TodoContext.Provider
      value={{
        state,
        getTodos,
        updateTodoContext,
        addTodoContext,
        deleteTodoContext,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
