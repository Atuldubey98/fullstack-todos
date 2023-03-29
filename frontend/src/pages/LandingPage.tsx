import { Card, Container } from "react-bootstrap";
import LoginModal from "../components/landingpage/LoginModal";
import SignUpModal from "../components/landingpage/SignUpModal";

const LandingPage = () => {
  return (
    <Container fluid>
      <Container className="d-flex align-items-center justify-content-center">
        <Card className="mt-3">
          <Card.Body>
            <Card.Text>Your todos are Safe</Card.Text>
            <Card.Subtitle>Login Or Sign up for new user</Card.Subtitle>
          </Card.Body>
        </Card>
      </Container>
      <LoginModal />
      <SignUpModal />
    </Container>
  );
};

export default LandingPage;
