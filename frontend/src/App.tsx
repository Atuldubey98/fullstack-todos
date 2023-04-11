import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import TodoSearchPage from "./pages/TodoSearchPage";
import TodosPage from "./pages/TodosPage";
import "./App.css";
import { CSSProperties, useContext } from "react";
import { UIContext } from "./contexts/UIContext";
const App = () => {
  const { isThemeDark } = useContext(UIContext);
  const style: CSSProperties = isThemeDark
    ? {
        backgroundColor: "var(--bg-color-dark)",
        color: "var(--text-color-dark)",
      }
    : {};
  return (
    <div style={style} className="app">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/todos" element={<TodosPage />} />
        <Route path="/todos/search" element={<TodoSearchPage />} />
      </Routes>
    </div>
  );
};

export default App;
