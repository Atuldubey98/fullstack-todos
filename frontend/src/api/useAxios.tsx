import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { TodoContext } from "../contexts/TodoContext";

const useAxios = () => {
  const navigate = useNavigate();
  const { resetUser } = useContext(AuthContext);
  const { resetTodos } = useContext(TodoContext);
  const baseURL = import.meta.env.DEV
    ? "http://localhost:9000"
    : import.meta.env.BASE_URL;
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status && error.response?.status > 400) {
          resetUser();
          resetTodos();
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
