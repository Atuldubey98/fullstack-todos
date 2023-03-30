import { Card, Container } from "react-bootstrap";
import LoginModal from "../components/landingpage/LoginModal";
import SignUpModal from "../components/landingpage/SignUpModal";
import { FcTodoList } from "react-icons/fc";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const { state } = useContext(AuthContext);
  return (
    <Container fluid>
      <Container className="mt-2 d-flex align-items-center justify-content-center flex-column">
        <h1 style={{ fontSize: "4rem" }} className="font-weight-bold">
          <FcTodoList />
          <span>Todos...</span>
        </h1>
        <h4>Your Todos are safe and encrypted</h4>
        {state.user ? (
          <Link to={"/todos"}>
            <h4>My Todos</h4>
          </Link>
        ) : (
          <h4>Please login to create Todos</h4>
        )}
      </Container>
      <LoginModal />
      <SignUpModal />
    </Container>
  );
};

export default LandingPage;
