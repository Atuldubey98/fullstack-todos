import { isAxiosError } from "axios";

export default function apiError(error: any): string {
  const errorMessage = isAxiosError(error)
    ? error.response?.data.errorMessage
    : "NETWORK_ERROR";
  switch (errorMessage) {
    case "UNAUTHORIZED":
      return "The user is not authorized";
    case "REGISTER_USER_EXISTS":
      return "Email already exists";
    case "LOGIN_EMAIL_ERROR":
      return "The email does not exists";
    case "LOGIN_PASSWORD_ERROR":
      return "The password does not match";
    case "TODO_PAYLOAD_ERROR":
      return "Todo not found !";
    case "TODO_NOT_FOUND":
      return "Todo not found !";
    default:
      return "Network error occured";
  }
}
