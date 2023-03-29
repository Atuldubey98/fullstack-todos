import { useContext } from "react";
import { Button, ButtonGroup, Container, Navbar } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { AuthContext } from "../contexts/AuthContext";
import { UIContext } from "../contexts/UIContext";

const Header = () => {
  const { toggleLoginModal, toggleSignUpModal } = useContext(UIContext);
  const { state, logout } = useContext(AuthContext);
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand>Todos</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {state.user ? (
            <div className="d-flex align-items-center justify-content-center">
              <Navbar.Text>{`Hi ${state.user.name}`}</Navbar.Text>
              <AiOutlineLogout
                onClick={logout}
                color="white"
                size={30}
                style={{ marginLeft: 5, cursor: "pointer" }}
              />
            </div>
          ) : (
            <ButtonGroup>
              <Button onClick={toggleLoginModal}>Login</Button>
              <Button onClick={toggleSignUpModal}>SignUp</Button>
            </ButtonGroup>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
