import { useContext } from "react";
import { Button, ButtonGroup, Container, Navbar } from "react-bootstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { FcTodoList } from "react-icons/fc";
import { useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { UIContext } from "../contexts/UIContext";
import { MdDarkMode } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";

const Header = () => {
  const { toggleLoginModal, toggleSignUpModal } = useContext(UIContext);
  const { state, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { toggleTheme, isThemeDark } = useContext(UIContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <FcTodoList /> Todos
        </Navbar.Brand>
        {isThemeDark ? (
          <FaRegLightbulb role="button" size={30} onClick={toggleTheme} />
        ) : (
          <MdDarkMode color="yellow" role="button" size={30} onClick={toggleTheme} />
        )}
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
