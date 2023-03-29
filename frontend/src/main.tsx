import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "react-bootstrap";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import TodoContextProvider from "./contexts/TodoContext";
import UIContextProvider from "./contexts/UIContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <UIContextProvider>
      <AuthContextProvider>
        <TodoContextProvider>
          <ThemeProvider
            breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
            minBreakpoint="xxs"
          >
            <App />
          </ThemeProvider>
        </TodoContextProvider>
      </AuthContextProvider>
    </UIContextProvider>
  </BrowserRouter>
);
