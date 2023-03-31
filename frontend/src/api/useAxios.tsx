import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();
  const baseURL = import.meta.env.DEV ? "http://localhost:9000/" : "";
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
          navigate("/");
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
