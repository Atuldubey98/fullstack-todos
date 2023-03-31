import IDefaultTodoState from "../interfaces/IDefaultTodoState";
export const TODOS_LOADING = "TODOS_LOADING";
export const TODOS_ERROR = "TODOS_ERROR";
export const TODOS_SUCCESS = "TODOS_SUCCESS";
export const TODO_ADD = "TODO_ADD";
export const TODO_UPDATE = "TODO_UPDATE";
export const TODO_DELETE = "TODO_DELETE";
export const SET_TODO = "SET_TODO";
export const UNSET_TODO = "UNSET_TODO";
export const RESET_TODOS = "RESET_TODOS";
const todoReducer = (state: IDefaultTodoState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case RESET_TODOS:
      return {
        ...state,
        todos: [],
        error: "",
        loading: false,
      };
    case TODO_ADD:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case TODO_UPDATE:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === payload?._id ? payload : todo
        ),
      };
    case TODO_DELETE:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== payload),
      };
    case UNSET_TODO:
      return {
        ...state,
        todo: null,
      };
    case SET_TODO:
      return {
        ...state,
        todo: payload,
      };
    case TODOS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: payload,
      };
    case TODOS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default todoReducer;
