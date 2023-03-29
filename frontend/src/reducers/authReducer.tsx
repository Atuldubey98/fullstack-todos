import { ReducerAction } from "react";
import IDefaultAuthState from "../interfaces/IDefaultAuthState";

export const AUTH_LOADING = "AUTH_LOADING";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_ERROR = "AUTH_ERROR";

export const LOGIN_LOADING = "LOGIN_LOADING";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REGISTER_LOADING = "REGISTER_LOADING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const RESET_USER = "RESET_USER";
export const defaultAuthState: IDefaultAuthState = {
  user: null,
  authLoading: false,
  loginLoading: false,
  loginError: "",
  registerError: "",
  registerLoading: false,
};

export default function authReducer(
  state: IDefaultAuthState,
  action: any
): IDefaultAuthState | any {
  const { type, payload } = action;
  switch (type) {
    case RESET_USER: {
      return {
        ...state,
        ...defaultAuthState,
      };
    }
    case LOGIN_LOADING:
      return {
        ...state,
        loginLoading: true,
      };
    case REGISTER_LOADING:
      return {
        ...state,
        registerLoading: true,
      };
    case AUTH_LOADING:
      return {
        ...state,
        authLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authLoading: false,
        user: payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        user: payload,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerLoading: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        loginLoading: false,
        loginError: payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        registerLoading: false,
        registerError: payload,
      };
    default:
      return state;
  }
}
