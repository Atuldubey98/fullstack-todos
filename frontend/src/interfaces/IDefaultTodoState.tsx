import ITodo from "./ITodo";

export default interface IDefaultTodoState {
  todos: ITodo[];
  loading: boolean;
  error: string;
}
