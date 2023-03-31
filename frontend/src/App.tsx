import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import TodoSearchPage from "./pages/TodoSearchPage";
import TodosPage from "./pages/TodosPage";
const App = () => {
  return (
    <div className="app">
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
