import { ChangeEventHandler, useContext, useState } from "react";
import { Alert, Button, Form, Modal, Spinner } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { UIContext } from "../../contexts/UIContext";
import ILoginUser from "../../interfaces/ILoginUser";

const LoginModal = () => {
  const { loginModal, toggleLoginModal } = useContext(UIContext);

  const [loginUser, setLoginUser] = useState<ILoginUser>({
    email: "",
    password: "",
  });
  const { email, password } = loginUser;
  const { state, login } = useContext(AuthContext);
  const { loginLoading, loginError } = state;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login(loginUser);
  };
  return (
    <Modal show={loginModal} onHide={toggleLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Login</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              onChange={onChange}
              value={email}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>
          {loginError ? <Alert variant={"danger"}>{loginError}</Alert> : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleLoginModal}>
            Close
          </Button>
          {loginLoading ? (
            <Spinner animation="grow" />
          ) : (
            <Button variant="success" type="submit">
              Login
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default LoginModal;
