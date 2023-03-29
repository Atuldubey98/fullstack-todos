import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const navigate = useNavigate();
  const instance = axios.create({
    baseURL: "http://localhost:9000/",
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
