import React, { ChangeEventHandler, useContext, useState } from "react";
import { Modal, Form, Alert, Button, Spinner } from "react-bootstrap";
import { AuthContext } from "../../contexts/AuthContext";
import { UIContext } from "../../contexts/UIContext";
import ISignUpUser from "../../interfaces/ISignUpUser";

const SignUpModal = () => {
  const { signUpModal, toggleSignUpModal } = useContext(UIContext);
  const [user, setUser] = useState<ISignUpUser>({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = user;
  const { state, signup } = useContext(AuthContext);
  const { registerLoading, registerError } = state;
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    signup(user);
  };
  return (
    <Modal show={signUpModal} onHide={toggleSignUpModal}>
      <Modal.Header closeButton>
        <Modal.Title className="text-center">Register</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="registerName">
            <Form.Label>Name :</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={name}
              autoFocus
              onChange={onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email address : </Form.Label>
            <Form.Control
              type="email"
              required
              name="email"
              onChange={onChange}
              value={email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label>Password :</Form.Label>
            <Form.Control
              required
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </Form.Group>

          {registerError ? (
            <Alert variant={"danger"}>{registerError}</Alert>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleSignUpModal}>
            Close
          </Button>
          {registerLoading ? (
            <Spinner animation="grow" />
          ) : (
            <Button variant="success" type="submit">
              SignUp
            </Button>
          )}
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default SignUpModal;
