import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiError from "../api/apiErrors";
import { CURRENT_USER_URL, LOGIN_URL, REGISTER_URL } from "../api/apiUrls";
import useAxios from "../api/useAxios";
import ILoginUser from "../interfaces/ILoginUser";
import ISignUpUser from "../interfaces/ISignUpUser";
import authReducer, {
  AUTH_LOADING,
  AUTH_SUCCESS,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  RESET_USER,
  defaultAuthState,
} from "../reducers/authReducer";
import { TodoContext } from "./TodoContext";
import { UIContext } from "./UIContext";

export const AuthContext = React.createContext({
  state: defaultAuthState,
  resetUser: function () {},
  logout: function () {},
  login: function (user: ILoginUser) {},
  signup: function (user: ISignUpUser) {},
  registerMsg: "",
});
interface AuthProps {
  children: JSX.Element;
}
export default function AuthContextProvider(props: AuthProps) {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);
  const { toggleLoginModal } = useContext(UIContext);
  const { resetTodos } = useContext(TodoContext);
  const [registerMsg, setRegisterMsg] = useState<string>("");
  const navigate = useNavigate();
  const instance = useAxios();
  function resetUser() {
    dispatch({ type: RESET_USER });
  }
  async function login(user: ILoginUser) {
    dispatch({ type: LOGIN_LOADING });
    try {
      const { data } = await instance.post(LOGIN_URL, user);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      toggleLoginModal();
    } catch (e) {
      const errorMessage = apiError(e);
      dispatch({
        type: LOGIN_ERROR,
        payload: errorMessage,
      });
    }
  }
  async function logout() {
    try {
      if (confirm("Do you want to logout")) {
        const response = await instance.post("/api/v1/users/logout");
        if (response.status === 200) {
          resetTodos();
          dispatch({ type: RESET_USER });
          navigate("/", { replace: true });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function signup(user: ISignUpUser) {
    dispatch({ type: REGISTER_LOADING });
    try {
      await instance.post(REGISTER_URL, user);
      dispatch({ type: REGISTER_SUCCESS });
      setRegisterMsg("Registeration Success");
    } catch (e) {
      dispatch({
        type: REGISTER_ERROR,
        payload: apiError(e),
      });
    }
  }
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: AUTH_LOADING });
        const { data } = await instance.get(CURRENT_USER_URL);
        dispatch({ type: AUTH_SUCCESS, payload: data });
      } catch (error) {}
    })();
  }, []);
  return (
    <AuthContext.Provider
      value={{ state, resetUser, login, signup, logout, registerMsg }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
