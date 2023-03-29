import { AxiosError } from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import apiError from "../api/apiErrors";
import { CURRENT_USER_URL, LOGIN_URL, REGISTER_URL } from "../api/apiUrls";
import useAxios from "../api/useAxios";
import ILoginUser from "../interfaces/ILoginUser";
import ISignUpUser from "../interfaces/ISignUpUser";
import authReducer, {
  AUTH_LOADING,
  AUTH_SUCCESS,
  defaultAuthState,
  LOGIN_ERROR,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  RESET_USER,
} from "../reducers/authReducer";

export const AuthContext = React.createContext({
  state: defaultAuthState,
  resetUser: function () {},
  logout: function () {},
  login: function (user: ILoginUser) {},
  signup: function (user: ISignUpUser) {},
});
interface AuthProps {
  children: JSX.Element;
}
export default function AuthContextProvider(props: AuthProps) {
  const [state, dispatch] = useReducer(authReducer, defaultAuthState);
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
      navigate("/todos", { replace: true });
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
    } catch (e) {
      const errorMessage = apiError(e);
      dispatch({
        type: REGISTER_ERROR,
        payload: errorMessage,
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
    <AuthContext.Provider value={{ state, resetUser, login, signup, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
