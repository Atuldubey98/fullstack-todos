import IUser from "./IUser";

export default interface IDefaultAuthState {
  user: IUser | null;
  authLoading: boolean;
  loginLoading: boolean;
  loginError: string;
  registerError: string;
  registerLoading: boolean;
}
