import { Card, Container, Row } from "react-bootstrap";
import LoginModal from "../components/landingpage/LoginModal";
import SignUpModal from "../components/landingpage/SignUpModal";
import { FcTodoList } from "react-icons/fc";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import CompleteCard from "../components/landingpage/CompleteCard";
import NotCompleteCard from "../components/landingpage/NotCompleteCard";
import useAxios from "../api/useAxios";
const LandingPage = () => {
  const instance = useAxios();
  const { state } = useContext(AuthContext);
  const [dashLoading, setDashLoading] = useState<boolean>(false);
  const [dashboard, setDashboard] = useState<{
    complete: number;
    notComplete: number;
  }>({ complete: 0, notComplete: 0 });
  useEffect(() => {
    if (state.user) {
      (async () => {
        try {
          setDashLoading(true);
          const { data } = await instance.get("/api/v1/todos/dashboard");
          setDashboard(data);
        } catch (error) {
        } finally {
          setDashLoading(false);
        }
      })();
    }
  }, [state.user?._id]);
  return (
    <Container fluid>
      <Container className="mt-2 d-flex align-items-center justify-content-center flex-column">
        <h1
          style={{ fontSize: "4rem" }}
          className="font-weight-bold text-center"
        >
          <FcTodoList />
          <span>Todos...</span>
        </h1>
        <h4 className="text-center">Your Todos are safe and encrypted</h4>
        {state.user ? (
          <Container>
            <Link to={"/todos"}>
              <h4 className="text-center">My Todos</h4>
            </Link>

            <Row xs={1}>
              <CompleteCard complete={dashboard.complete} />
              <NotCompleteCard notComplete={dashboard.notComplete} />
            </Row>
          </Container>
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
